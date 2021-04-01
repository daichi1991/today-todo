module Api
    module V1
        class BoardsController < ApplicationController
            def index
                user = User.find(params[:user_id])
                @boards = user.boards
                render :index
            end
        end
    end
    
end