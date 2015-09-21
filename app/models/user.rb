module Sanitizer

  def sanitize ar_user
    hashed_self = ar_user.as_json
    if hashed_self.class == Array
      hashed_self.each do |instance|
        instance.delete("password_digest")
        if instance["hide_full_name"]
          instance.delete("real_name")
        end
        instance.delete("hide_full_name")
      end
    else
      hashed_self.delete("password_digest")
      if hashed_self["hide_full_name"] == "true"
        hashed_self.delete("real_name")
      end
      hashed_self.delete("hide_full_name")
      hashed_self.delete("api_key")
      return hashed_self
    end
  end

end

class User < ActiveRecord::Base
  has_secure_password
  require "securerandom"
  validates :username, uniqueness: {case_sensitive: false, message: "E01 - Username already exists"}
  validates :email, uniqueness: {case_sensitive: false, message: "E02 - E-mail address already in use"}
  # validates :password_confirmation, presence: true, :message => 
  has_many :reviews
  before_create :generate_api_key

  extend Sanitizer

  def generate_api_key
  	self.api_key = SecureRandom.urlsafe_base64(25)
  end





end
