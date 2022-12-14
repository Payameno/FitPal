class Api::WorkoutsController < ApplicationController
  before_action :set_workout, only: [:show, :update, :destroy]

  # get /workouts/users/:id
  def index
    @workout = Workout.where(["user_id = :user_id",{user_id: params[:user_id]}])
    render json: @workout
  end

  # GET /workouts/:id (with workout id)
  def show
    @workout = set_workout
    @line_exercises = LineExercise.where(workout_id: @workout.id)
    @exercises = @line_exercises.map { |item|
      {exercise: Exercise.find(item.exercise_id), exercise_duration: item.exercise_duration, total_exercise_calories: item.total_exercise_calories}
    }
    #should render with the the previous 3 variables as keys into a json object
    render :json => {:workout => @workout, 
                                      :line_exercises => @line_exercises,
                                      :exercises => @exercises }
  end

  def get_with_date
    workout = Workout.where(user_id: params[:user_id])
    workout = workout.where(date: params[:date])

    render json: workout
  end

  # POST /workouts/
  def create
    workout = create_workout()

    if workout.valid?
      empty_cart!
      render json: workout
    else
      render json: workout.errors, status: :unprocessable_entity
    end
  end


  # DELETE /workouts/1  
  def destroy
    @line_exercises = LineExercise.where(workout_id: @workout.id)
    @line_exercises.map {|item| item.destory} 
    @workout.destroy
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_workout
      @workout = Workout.find(params[:id])
    end

    def workout_params
      params.require(:workout).permit(:user_id, :date)
    end

    def create_workout()
      workout = Workout.new(
        user_id: params[:user_id],
        date: params[:date])

      user = User.find_by_id(params[:user_id])
    
      workout.total_workout_calories = cart_total_calories_burned(weight_class(user.weight_kg))
      workout.workout_duration = cart_total_duration

      weight_class = weight_class(user.weight_kg)

      enhanced_cart.each do |entry|
        exercise = entry[:exercise]
        exercise_duration = entry[:exercise_duration]
        workout.line_exercises.new(
          name: exercise[:name],
          exercise: exercise,
          exercise_duration: exercise_duration,
          total_exercise_calories: exercise[weight_class] / 60 * exercise_duration
        )
      end

      workout.save!
      workout
    end 
end
