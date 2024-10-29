import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "signin": "Sign in",
      "signup": "Sign up",
      "signout": "Sign out",
      "dashboard": "Dashboard",
      "email": "Email address",
      "password": "Password",
      "fullName": "Full Name",
      "confirmPassword": "Confirm Password",
      "createAccount": "Create your account",
      "signInToAccount": "Sign in to your account",
      "dontHaveAccount": "Don't have an account?",
      "alreadyHaveAccount": "Already have an account?",
      "userProfile": "User Profile",
      "userId": "User ID",
      "emailVerified": "Email Verified",
      "creationTime": "Account Created",
      "yes": "Yes",
      "no": "No",
      "failedSignIn": "Failed to sign in",
      "failedSignUp": "Failed to create an account",
      "passwordsNoMatch": "Passwords do not match",
      "language": "Language",
      "signInWithGoogle": "Sign in with Google",
      "signInWithMicrosoft": "Sign in with Microsoft",
      "signInWithEmailAndPassword": "Sign In with Email and Password",
      "signInWithFacebook": "Sign in with Facebook",
      "signInWithPlayGames": "Sign in with Play Games",
      "signInWithGameCenter": "Sign in with Game Center",
      "signInWithApple": "Sign in with Apple",
      "signInWithGitHub": "Sign in with GitHub",
      "signInWithTwitter": "Sign in with Twitter",
      "signInWithYahoo": "Sign in with Yahoo",
      "forgotPassword": "Forgot Password?",
      "resetPassword": "Reset Password",
      "sendResetEmail": "Send Reset Email",
      "backToSignIn": "Back to Sign In",
      "passwordResetEmailSent": "Password reset email sent! Check your inbox.",
      "failedToSendResetEmail": "Failed to send reset email. Please try again.",
      "avatar": "Avatar",
      "myProfile": "My Profile",
      "editName": "Edit Name",
      "editEmail": "Edit Email",
      "save": "Save",
      "cancel": "Cancel",
      "nameUpdateSuccess": "Your name has been updated successfully",
      "nameUpdateError": "Failed to update your name. Please try again",
      "emailUpdateSuccess": "Your email has been updated successfully",
      "emailUpdateError": "Failed to update your email. Please try again",
      "emailVerificationRequired": "Please verify your current email address before changing to a new one. Check your email inbox for a verification link."
    }
  },
  zh: {
    translation: {
      "signin": "登录",
      "signup": "注册",
      "signout": "退出",
      "dashboard": "控制台",
      "email": "邮箱地址",
      "password": "密码",
      "fullName": "姓名",
      "confirmPassword": "确认密码",
      "createAccount": "创建账户",
      "signInToAccount": "登录您的账户",
      "dontHaveAccount": "还没有账户？",
      "alreadyHaveAccount": "已有账户？",
      "userProfile": "用户信息",
      "userId": "用户ID",
      "emailVerified": "邮箱已验证",
      "creationTime": "创建时间",
      "yes": "是",
      "no": "否",
      "failedSignIn": "登录失败",
      "failedSignUp": "创建账户失败",
      "passwordsNoMatch": "密码不匹配",
      "language": "语言",
      "signInWithGoogle": "使用 Google 登录",
      "signInWithMicrosoft": "使用 Microsoft 登录",
      "signInWithEmailAndPassword": "使用邮箱和密码登录",
      "signInWithFacebook": "使用 Facebook 登录",
      "signInWithPlayGames": "使用 Play Games 登录",
      "signInWithGameCenter": "使用 Game Center 登录",
      "signInWithApple": "使用 Apple 登录",
      "signInWithGitHub": "使用 GitHub 登录",
      "signInWithTwitter": "使用 Twitter 登录",
      "signInWithYahoo": "使用 Yahoo 登录",
      "forgotPassword": "忘记密码？",
      "resetPassword": "重置密码",
      "sendResetEmail": "发送重置邮件",
      "backToSignIn": "返回登录",
      "passwordResetEmailSent": "密码重置邮件已发送！请检查您的收件箱。",
      "failedToSendResetEmail": "发送重置邮件失败。请再试一次。",
      "avatar": "头像",
      "myProfile": "我的资料",
      "editName": "编辑姓名",
      "editEmail": "编辑邮箱",
      "save": "保存",
      "cancel": "取消",
      "nameUpdateSuccess": "您的姓名已更新成功",
      "nameUpdateError": "更新姓名失败，请重试",
      "emailUpdateSuccess": "您的邮箱已更新成功",
      "emailUpdateError": "更新邮箱失败，请重试",
      "emailVerificationRequired": "更改邮箱前请先验证当前邮箱地址。请检查您的邮箱收件箱查看验证链接。"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
