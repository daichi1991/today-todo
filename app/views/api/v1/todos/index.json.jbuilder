json.array!(@boards) do |board|
    json.(board, :id, :name)
    json.todos board.todos do |todo|
        json.(todo, :id, :title, :memo)
    end
end