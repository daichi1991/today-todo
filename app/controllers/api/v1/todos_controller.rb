module Api
    module V1
        class TodosController > ApplicationController
            def create
                @todo = Todo.new(user_id: params[:user_id], board_id: params[:board_id], title: params[:title], memo: params[:text])
                
                if @todo.save
                    render json: {
                        todo: @todo
                    },status: :created
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

            private

                def todo_params
                    params.require(:todo).permit(:title, :memo, :user_id, :board_id, :active, :position)
                end
                

        end
    end
end