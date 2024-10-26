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
      "confirmPassword": "Confirm Password",
      "createAccount": "Create your account",
      "signInToAccount": "Sign in to your account",
      "dontHaveAccount": "Don't have an account?",
      "alreadyHaveAccount": "Already have an account?",
      "userProfile": "User Profile",
      "userId": "User ID",
      "emailVerified": "Email Verified",
      "yes": "Yes",
      "no": "No",
      "failedSignIn": "Failed to sign in",
      "failedSignUp": "Failed to create an account",
      "passwordsNoMatch": "Passwords do not match",
      "language": "Language"
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
      "confirmPassword": "确认密码",
      "createAccount": "创建账户",
      "signInToAccount": "登录您的账户",
      "dontHaveAccount": "还没有账户？",
      "alreadyHaveAccount": "已有账户？",
      "userProfile": "用户信息",
      "userId": "用户ID",
      "emailVerified": "邮箱已验证",
      "yes": "是",
      "no": "否",
      "failedSignIn": "登录失败",
      "failedSignUp": "创建账户失败",
      "passwordsNoMatch": "密码不匹配",
      "language": "语言"
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
