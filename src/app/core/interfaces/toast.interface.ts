import { ToastButton, Animation } from '@ionic/core';

export interface Toast {
  animated?: boolean;
  buttons?: (string | ToastButton)[] | undefined;
  closeButtonText?: string | undefined;
  color?: string | undefined;
  cssClass?: string | string[] | undefined;
  duration?: number;
  enterAnimation?: ((Animation: Animation, baseEl: any, opts?: any) => Promise<Animation>) | undefined;
  header?: string | undefined;
  keyboardClose?: boolean;
  leaveAnimation?: ((Animation: Animation, baseEl: any, opts?: any) => Promise<Animation>) | undefined;
  message: string | undefined;
  mode?: 'ios' | 'md';
  position?: 'bottom' | 'middle' | 'top';
  showCloseButton?: boolean;
  translucent?: boolean;
}
