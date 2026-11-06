import type { CSSProperties, ReactNode } from 'react';

interface PhoneFrameProps {
  /** Largura em px. A arte do panfleto tem 130 x 244; tudo escala a partir dela. */
  width: number;
  height: number;
  rotate?: number;
  /** O conteúdo ocupa a tela inteira, de borda a borda, como um app aberto. */
  fullScreen?: boolean;
  className?: string;
  children: ReactNode;
}

/** O celular do panfleto: corpo marinho, tela verde-clara, recorte, botões e barrinha. */
export function PhoneFrame({ width, height, rotate, fullScreen = false, className = '', children }: PhoneFrameProps) {
  const style = {
    '--k': width / 130,
    width: `${width}px`,
    height: `${height}px`,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
  } as CSSProperties;

  return (
    <div className={`phone ${fullScreen ? 'phone--full' : ''} ${className}`.trim()} style={style}>
      <span className="phone__btn phone__btn--l1" aria-hidden="true" />
      <span className="phone__btn phone__btn--l2" aria-hidden="true" />
      <span className="phone__btn phone__btn--r" aria-hidden="true" />
      <div className="phone__body">
        <div className="phone__screen">
          <span className="phone__notch" aria-hidden="true" />
          {children}
          <span className="phone__home" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
