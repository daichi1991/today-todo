class Board < ApplicationRecord
    has_many :todos
    belongs_to :user
    
    validates :name, presence: true
end