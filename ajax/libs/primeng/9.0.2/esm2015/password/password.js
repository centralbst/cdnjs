var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, ElementRef, HostListener, Input, OnDestroy, DoCheck, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
let Password = class Password {
    constructor(el, zone) {
        this.el = el;
        this.zone = zone;
        this.promptLabel = 'Enter a password';
        this.weakLabel = 'Weak';
        this.mediumLabel = 'Medium';
        this.strongLabel = 'Strong';
        this.feedback = true;
    }
    set showPassword(show) {
        this.el.nativeElement.type = show ? 'text' : 'password';
    }
    ngDoCheck() {
        this.updateFilledState();
    }
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    onInput(e) {
        this.updateFilledState();
    }
    updateFilledState() {
        this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
    }
    createPanel() {
        this.panel = document.createElement('div');
        this.panel.className = 'ui-password-panel ui-widget ui-state-highlight ui-corner-all';
        this.meter = document.createElement('div');
        this.meter.className = 'ui-password-meter';
        this.info = document.createElement('div');
        this.info.className = 'ui-password-info';
        this.info.textContent = this.promptLabel;
        this.panel.appendChild(this.meter);
        this.panel.appendChild(this.info);
        this.panel.style.minWidth = DomHandler.getOuterWidth(this.el.nativeElement) + 'px';
        document.body.appendChild(this.panel);
    }
    onFocus(e) {
        if (this.feedback) {
            if (!this.panel) {
                this.createPanel();
            }
            this.panel.style.zIndex = String(++DomHandler.zindex);
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    DomHandler.addClass(this.panel, 'ui-password-panel-visible');
                    DomHandler.removeClass(this.panel, 'ui-password-panel-hidden');
                }, 1);
                DomHandler.absolutePosition(this.panel, this.el.nativeElement);
            });
        }
    }
    onBlur(e) {
        if (this.feedback) {
            DomHandler.addClass(this.panel, 'ui-password-panel-hidden');
            DomHandler.removeClass(this.panel, 'ui-password-panel-visible');
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.ngOnDestroy();
                }, 150);
            });
        }
    }
    onKeyup(e) {
        if (this.feedback) {
            let value = e.target.value, label = null, meterPos = null;
            if (value.length === 0) {
                label = this.promptLabel;
                meterPos = '0px 0px';
            }
            else {
                var score = this.testStrength(value);
                if (score < 30) {
                    label = this.weakLabel;
                    meterPos = '0px -10px';
                }
                else if (score >= 30 && score < 80) {
                    label = this.mediumLabel;
                    meterPos = '0px -20px';
                }
                else if (score >= 80) {
                    label = this.strongLabel;
                    meterPos = '0px -30px';
                }
            }
            this.meter.style.backgroundPosition = meterPos;
            this.info.textContent = label;
        }
    }
    testStrength(str) {
        let grade = 0;
        let val;
        val = str.match('[0-9]');
        grade += this.normalize(val ? val.length : 1 / 4, 1) * 25;
        val = str.match('[a-zA-Z]');
        grade += this.normalize(val ? val.length : 1 / 2, 3) * 10;
        val = str.match('[!@#$%^&*?_~.,;=]');
        grade += this.normalize(val ? val.length : 1 / 6, 1) * 35;
        val = str.match('[A-Z]');
        grade += this.normalize(val ? val.length : 1 / 6, 1) * 30;
        grade *= str.length / 8;
        return grade > 100 ? 100 : grade;
    }
    normalize(x, y) {
        let diff = x - y;
        if (diff <= 0)
            return x / y;
        else
            return 1 + 0.5 * (x / (x + y / 4));
    }
    get disabled() {
        return this.el.nativeElement.disabled;
    }
    ngOnDestroy() {
        if (this.panel) {
            document.body.removeChild(this.panel);
            this.panel = null;
            this.meter = null;
            this.info = null;
        }
    }
};
Password.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
__decorate([
    Input()
], Password.prototype, "promptLabel", void 0);
__decorate([
    Input()
], Password.prototype, "weakLabel", void 0);
__decorate([
    Input()
], Password.prototype, "mediumLabel", void 0);
__decorate([
    Input()
], Password.prototype, "strongLabel", void 0);
__decorate([
    Input()
], Password.prototype, "feedback", void 0);
__decorate([
    Input()
], Password.prototype, "showPassword", null);
__decorate([
    HostListener('input', ['$event'])
], Password.prototype, "onInput", null);
__decorate([
    HostListener('focus', ['$event'])
], Password.prototype, "onFocus", null);
__decorate([
    HostListener('blur', ['$event'])
], Password.prototype, "onBlur", null);
__decorate([
    HostListener('keyup', ['$event'])
], Password.prototype, "onKeyup", null);
Password = __decorate([
    Directive({
        selector: '[pPassword]',
        host: {
            '[class.ui-inputtext]': 'true',
            '[class.ui-corner-all]': 'true',
            '[class.ui-state-default]': 'true',
            '[class.ui-widget]': 'true',
            '[class.ui-state-filled]': 'filled'
        }
    })
], Password);
export { Password };
let PasswordModule = class PasswordModule {
};
PasswordModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Password],
        declarations: [Password]
    })
], PasswordModule);
export { PasswordModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3Bhc3N3b3JkLyIsInNvdXJjZXMiOlsicGFzc3dvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFZdkMsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtJQXdCakIsWUFBbUIsRUFBYyxFQUFTLElBQVk7UUFBbkMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUF0QjdDLGdCQUFXLEdBQVcsa0JBQWtCLENBQUM7UUFFekMsY0FBUyxHQUFXLE1BQU0sQ0FBQztRQUUzQixnQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUUvQixnQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUUvQixhQUFRLEdBQVksSUFBSSxDQUFDO0lBY3VCLENBQUM7SUFaakQsSUFBSSxZQUFZLENBQUMsSUFBYTtRQUNuQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUM1RCxDQUFDO0lBWUQsU0FBUztRQUNMLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCwwR0FBMEc7SUFFMUcsT0FBTyxDQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFB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QkFBeUIsRUFBRSxRQUFRO1NBQ3RDO0tBQ0osQ0FBQztHQUNXLFFBQVEsQ0FpS3BCO1NBaktZLFFBQVE7QUF3S3JCLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7Q0FBSSxDQUFBO0FBQWxCLGNBQWM7SUFMMUIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNuQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7S0FDM0IsQ0FBQztHQUNXLGNBQWMsQ0FBSTtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxEaXJlY3RpdmUsRWxlbWVudFJlZixIb3N0TGlzdGVuZXIsSW5wdXQsT25EZXN0cm95LERvQ2hlY2ssTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BQYXNzd29yZF0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy51aS1pbnB1dHRleHRdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLWNvcm5lci1hbGxdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWRlZmF1bHRdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLXdpZGdldF0nOiAndHJ1ZScsXG4gICAgICAgICdbY2xhc3MudWktc3RhdGUtZmlsbGVkXSc6ICdmaWxsZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBQYXNzd29yZCBpbXBsZW1lbnRzIE9uRGVzdHJveSxEb0NoZWNrIHtcblxuICAgIEBJbnB1dCgpIHByb21wdExhYmVsOiBzdHJpbmcgPSAnRW50ZXIgYSBwYXNzd29yZCc7XG5cbiAgICBASW5wdXQoKSB3ZWFrTGFiZWw6IHN0cmluZyA9ICdXZWFrJztcblxuICAgIEBJbnB1dCgpIG1lZGl1bUxhYmVsOiBzdHJpbmcgPSAnTWVkaXVtJztcblxuICAgIEBJbnB1dCgpIHN0cm9uZ0xhYmVsOiBzdHJpbmcgPSAnU3Ryb25nJztcbiAgICBcbiAgICBASW5wdXQoKSBmZWVkYmFjazogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzZXQgc2hvd1Bhc3N3b3JkKHNob3c6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnR5cGUgPSBzaG93ID8gJ3RleHQnIDogJ3Bhc3N3b3JkJztcbiAgICB9XG4gICAgXG4gICAgcGFuZWw6IEhUTUxEaXZFbGVtZW50O1xuICAgIFxuICAgIG1ldGVyOiBhbnk7XG4gICAgXG4gICAgaW5mbzogYW55O1xuICAgIFxuICAgIGZpbGxlZDogYm9vbGVhbjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUpIHt9XG4gICAgXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgfVxuICAgIFxuICAgIC8vVG8gdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uIHRvIG1hbmFnZSB1aS1zdGF0ZS1maWxsZWQgZm9yIG1hdGVyaWFsIGxhYmVscyB3aGVuIHRoZXJlIGlzIG5vIHZhbHVlIGJpbmRpbmdcbiAgICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pIFxuICAgIG9uSW5wdXQoZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZUZpbGxlZFN0YXRlKCkge1xuICAgICAgICB0aGlzLmZpbGxlZCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSAmJiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUubGVuZ3RoO1xuICAgIH1cblxuICAgIGNyZWF0ZVBhbmVsKCkge1xuICAgICAgICB0aGlzLnBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMucGFuZWwuY2xhc3NOYW1lID0gJ3VpLXBhc3N3b3JkLXBhbmVsIHVpLXdpZGdldCB1aS1zdGF0ZS1oaWdobGlnaHQgdWktY29ybmVyLWFsbCc7XG4gICAgICAgIHRoaXMubWV0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5tZXRlci5jbGFzc05hbWUgPSAndWktcGFzc3dvcmQtbWV0ZXInO1xuICAgICAgICB0aGlzLmluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5pbmZvLmNsYXNzTmFtZSA9ICd1aS1wYXNzd29yZC1pbmZvJztcbiAgICAgICAgdGhpcy5pbmZvLnRleHRDb250ZW50ID0gdGhpcy5wcm9tcHRMYWJlbDtcbiAgICAgICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLm1ldGVyKTtcbiAgICAgICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLmluZm8pO1xuICAgICAgICB0aGlzLnBhbmVsLnN0eWxlLm1pbldpZHRoID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuZWwubmF0aXZlRWxlbWVudCkgKyAncHgnO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xuICAgIH1cbiAgICAgICAgXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXMnLCBbJyRldmVudCddKSBcbiAgICBvbkZvY3VzKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuZmVlZGJhY2spIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wYW5lbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUGFuZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3R5bGUuekluZGV4ID0gU3RyaW5nKCsrRG9tSGFuZGxlci56aW5kZXgpO1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLnBhbmVsLCAndWktcGFzc3dvcmQtcGFuZWwtdmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMucGFuZWwsICd1aS1wYXNzd29yZC1wYW5lbC1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5wYW5lbCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbJyRldmVudCddKSBcbiAgICBvbkJsdXIoZSkgeyAgIFxuICAgICAgICBpZiAodGhpcy5mZWVkYmFjaykge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLnBhbmVsLCAndWktcGFzc3dvcmQtcGFuZWwtaGlkZGVuJyk7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMucGFuZWwsICd1aS1wYXNzd29yZC1wYW5lbC12aXNpYmxlJyk7XG5cbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9LCAxNTApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gICAgIFxuICAgIH1cbiAgICBcbiAgICBASG9zdExpc3RlbmVyKCdrZXl1cCcsIFsnJGV2ZW50J10pXG4gICAgb25LZXl1cChlKSB7XG4gICAgICAgIGlmICh0aGlzLmZlZWRiYWNrKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcbiAgICAgICAgICAgIGxhYmVsID0gbnVsbCxcbiAgICAgICAgICAgIG1ldGVyUG9zID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy5wcm9tcHRMYWJlbDtcbiAgICAgICAgICAgICAgICBtZXRlclBvcyA9ICcwcHggMHB4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBzY29yZSA9IHRoaXMudGVzdFN0cmVuZ3RoKHZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmIChzY29yZSA8IDMwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy53ZWFrTGFiZWw7XG4gICAgICAgICAgICAgICAgICAgIG1ldGVyUG9zID0gJzBweCAtMTBweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjb3JlID49IDMwICYmIHNjb3JlIDwgODApIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLm1lZGl1bUxhYmVsO1xuICAgICAgICAgICAgICAgICAgICBtZXRlclBvcyA9ICcwcHggLTIwcHgnO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2NvcmUgPj0gODApIHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLnN0cm9uZ0xhYmVsO1xuICAgICAgICAgICAgICAgICAgICBtZXRlclBvcyA9ICcwcHggLTMwcHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tZXRlci5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSBtZXRlclBvcztcbiAgICAgICAgICAgIHRoaXMuaW5mby50ZXh0Q29udGVudCA9IGxhYmVsO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHRlc3RTdHJlbmd0aChzdHI6IHN0cmluZykge1xuICAgICAgICBsZXQgZ3JhZGU6IG51bWJlciA9IDA7XG4gICAgICAgIGxldCB2YWw7XG5cbiAgICAgICAgdmFsID0gc3RyLm1hdGNoKCdbMC05XScpO1xuICAgICAgICBncmFkZSArPSB0aGlzLm5vcm1hbGl6ZSh2YWwgPyB2YWwubGVuZ3RoIDogMS80LCAxKSAqIDI1O1xuXG4gICAgICAgIHZhbCA9IHN0ci5tYXRjaCgnW2EtekEtWl0nKTtcbiAgICAgICAgZ3JhZGUgKz0gdGhpcy5ub3JtYWxpemUodmFsID8gdmFsLmxlbmd0aCA6IDEvMiwgMykgKiAxMDtcblxuICAgICAgICB2YWwgPSBzdHIubWF0Y2goJ1shQCMkJV4mKj9ffi4sOz1dJyk7XG4gICAgICAgIGdyYWRlICs9IHRoaXMubm9ybWFsaXplKHZhbCA/IHZhbC5sZW5ndGggOiAxLzYsIDEpICogMzU7XG5cbiAgICAgICAgdmFsID0gc3RyLm1hdGNoKCdbQS1aXScpO1xuICAgICAgICBncmFkZSArPSB0aGlzLm5vcm1hbGl6ZSh2YWwgPyB2YWwubGVuZ3RoIDogMS82LCAxKSAqIDMwO1xuXG4gICAgICAgIGdyYWRlICo9IHN0ci5sZW5ndGggLyA4O1xuXG4gICAgICAgIHJldHVybiBncmFkZSA+IDEwMCA/IDEwMCA6IGdyYWRlO1xuICAgIH1cbiAgICBcbiAgICBub3JtYWxpemUoeCwgeSkge1xuICAgICAgICBsZXQgZGlmZiA9IHggLSB5O1xuXG4gICAgICAgIGlmIChkaWZmIDw9IDApXG4gICAgICAgICAgICByZXR1cm4geCAvIHk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiAxICsgMC41ICogKHggLyAoeCArIHkvNCkpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQ7XG4gICAgfVxuICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5wYW5lbCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLnBhbmVsKTtcbiAgICAgICAgICAgIHRoaXMucGFuZWwgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5tZXRlciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmluZm8gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtQYXNzd29yZF0sXG4gICAgZGVjbGFyYXRpb25zOiBbUGFzc3dvcmRdXG59KVxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkTW9kdWxlIHsgfVxuIl19