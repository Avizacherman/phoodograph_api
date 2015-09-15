class User < ActiveRecord::Base
	has_secure_password
	# validates :password_confirmation, presence: true
	has_many :reviews
					

	 def self.sanitize_password(ar_user)
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
		end

		return hashed_self


	end
	

end
