class User < ApplicationRecord
    has_many :boards
    has_many :todos

    validates :name, :email, presence: true
    validates :name, length:{maximum: 30}
    
end