module Api
    module V1
        class BoardsController < ApplicationController
            def index
                user = User.find(params[:user_id])
                @boards = user.boards
                render :index
            end

            def create
                @board = Board.new(board_params)
                
                if @board.save
                    render :index
                else
                    render json:{}, status: :internal_server_error
                end
            end

            def board_params
                params.require(:board).permit(:user_id, :name, :position)
            end
        end
    end
    
end