module Api
    module V1
        class BoardsController < ApplicationController
            def index
                user = User.find(params[:user_id])
                boards = user.boards
                todos = boards.find(1).todos

                render json: {
                    boards: boards,
                    todos: todos,
                },status: :ok
            end
        end
    end
    
end