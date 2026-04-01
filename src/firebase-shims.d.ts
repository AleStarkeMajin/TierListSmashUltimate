declare module "firebase/app" {
  export function initializeApp(config?: any): any;
  const _default: any;
  export default _default;
}

declare module "firebase/auth" {
  export function getAuth(app?: any): any;
  export function signInAnonymously(auth?: any): Promise<any>;
  const _default: any;
  export default _default;
}

declare module "firebase/firestore" {
  export function getFirestore(app?: any, dbId?: any): any;
  export function collection(db: any, ...path: any[]): any;
  export function onSnapshot(ref: any, cb: any, err?: any): any;
  export function doc(db: any, ...path: any[]): any;
  export function setDoc(docRef: any, data: any, options?: any): Promise<any>;
  export function serverTimestamp(): any;
  export function getDocFromServer(docRef: any): Promise<any>;
  const _default: any;
  export default _default;
}

declare module "*.json" {
  const value: any;
  export default value;
}
