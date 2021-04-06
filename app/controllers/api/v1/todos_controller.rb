module Api
    module V1
        class TodosController < ApplicationController
            def index
                user = User.find(params[:user_id])
                @boards = user.boards
                render :index
            end

            def create
                @todo = Todo.new(todo_params)
                user = User.find(params[:user_id])
                @boards = user.boards
                
                if @todo.save
                    render :index
                else
                    render json:{}, status: :internal_server_error
                end
            end
            
            def update
                @todo = Todo.find(params[:id])
                if @todo.update(todo_params)
                    render json: {
                        todo: @todo
                    },status: :updated
                else
                    render json: {},status: :internal_server_error
                end
            end

                def todo_params
                    params.require(:todo).permit(:title, :memo, :user_id, :board_id, :active, :position)
                end
                

        end
    end
end