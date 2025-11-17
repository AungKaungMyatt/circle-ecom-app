export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dob: string | null;
  phoneNumber: string | null;
  gender: "male" | "female" | null;
  pin: string | null;
  role: "admin" | "user";
  isEmailVerified: boolean;
  emailVerificationExpires: string | null; // ISO datetime
  is2FAEnabled: boolean;
  twoFAExpires: string | null;
  resetPasswordToken: string | null;
  resetPasswordExpires: string | null;
}
