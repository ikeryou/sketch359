import { MousePointer } from "../core/mousePointer";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Rect } from "../libs/rect";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class TextItem extends MyDisplay {

  private _inner: HTMLElement;
  public get inner(): HTMLElement {
    return this._inner;
  }

  private _pos: Rect = new Rect();
  public get pos(): Rect {
    return this._pos;
  }

  constructor(opt:any) {
    super(opt)

    Tween.set(this.el, {
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'hidden',
    });

    this._inner = this.el.querySelector('p') as HTMLElement;
    this._inner.classList.remove('js-text-org');
    this._inner.classList.add('js-text-item-inner');
    Tween.set(this._inner, {
      position: 'absolute',
      top: 0,
      left: 0,
    })

    if(Util.hit(5)) {
      Tween.set(this._inner, {
        color: Util.randomArr(['#ff0000', '#0000ff'])
      })
    }

    this.useGPU(this._inner);
    this.useGPU(this.el);
  }

  protected _update(): void {
    super._update();

    const mx = MousePointer.instance.x;
    const my = MousePointer.instance.y;

    const dx = mx - this._pos.x;
    const dy = my - this._pos.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    if(d < this._pos.width) {
      this._inner.classList.add('-effect');
    } else {
      this._inner.classList.remove('-effect');
    }
  }

  protected _resize(): void {
    super._resize();
  }
}