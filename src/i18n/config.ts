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
      "forgotPassword": "Forgot Password?" // New translation key
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
      "forgotPassword": "忘记密码？" // New translation key
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
