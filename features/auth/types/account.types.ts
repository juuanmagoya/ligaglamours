import { AppUser }
from "@/features/users/types/user.types"

export interface UpdateUserProfileData {
  name?: string
  email?: string
  password?: string
}

export interface ChangeEmailData {
  newEmail: string
  currentPassword: string
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UpdateProfileData {
  name: string
}

export interface AccountActionResponse {
  success?: boolean
  error?: string
  message?: string
}

export interface AccountFormProps {
  user: AppUser
}

export interface ChangeEmailFormProps {
  userId: string
  currentEmail: string
}

export interface ChangePasswordFormProps {
  userId: string
}

export interface DatabaseUser
  extends AppUser {

  password: string
}