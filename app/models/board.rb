class Board < ApplicationRecord
    has_many :todos
    belongs_to :user
    accepts_nested_attributes_for :todos
    
    validates :name, presence: true
end