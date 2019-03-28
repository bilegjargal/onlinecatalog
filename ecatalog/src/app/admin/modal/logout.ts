import { Component, Input, ElementRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: '[appLogout]',
  template: '<ng-content></ng-content>'
})
export class LogoutModal {
  @Input() id: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let modal = this;

    if (!this.id) {
      console.log("Modal must have an id");
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'modal') {

      }
    });
  }

}
