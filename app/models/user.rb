class User < ActiveRecord::Base
  has_secure_password
  require "securerandom"
  validates :username, uniqueness: {case_sensitive: false, message: "E01 - Username already exists"}
  validates :email, uniqueness: {case_sensitive: false, message: "E02 - E-mail address already in use"}
  # validates :password_confirmation, presence: true, :message =>
  has_many :reviews
  before_create :generate_api_key

  # extend Sanitizer

  def generate_api_key
  	self.api_key = SecureRandom.urlsafe_base64(25)
  end





end
