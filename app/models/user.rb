class User < ApplicationRecord
    has_many :boards
    accepts_nested_attributes_for :boards

    validates :name, :email, presence: true
    validates :name, length:{maximum: 30}
    
end