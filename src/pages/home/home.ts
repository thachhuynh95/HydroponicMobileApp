import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AddDevicePage } from '../add-device/add-device';
import { DeviceService } from '../../services/device.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { DevicePage } from '../device/device';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

declare const FCMPlugin: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    public deviceList: any[];

    constructor(private navCtrl: NavController, private deviceService: DeviceService,
        private authService: AuthService, private toastService: ToastService,
        private qrScanner: QRScanner) {

    }

    public ngOnInit() {
        console.log("init homepage")
        this.deviceService.getAllDevice().subscribe((res: any) => {
            if (res.success) {
                this.deviceList = res.data;

                this.deviceList.forEach((device) => {
                    let topic = '/topics/' + device.mac.replace(/[:]/g, '');
                    FCMPlugin.subscribeToTopic(topic, () => {
                        console.log('subscribe success to ' + device.mac)
                    }, (err) => {
                        console.log(err);
                    });
                })

            } else {
                this.toastService.showToast(res.message);
            }
        }, (err: any) => {
            console.log('get all device err: ' + err)
        })

    }

    public goToAddDevicePage() {
        // Optionally request the permission early
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                console.log(status)
                if (status.authorized) {
                    
                    // start scanning
                    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        console.log(JSON.parse(text));
                        this.deviceService.addNewDevice(JSON.parse(text)).subscribe((res: any) => {
                            this.toastService.showToast(res.message);
                            this.ngOnInit();
                        }, (err) => {
                            this.toastService.showToast(err);
                        })
                        this.qrScanner.hide(); // hide camera preview
                        scanSub.unsubscribe(); // stop scanning

                        window.document.querySelector('ion-app').classList.remove('transparent-body');
                    });
                    // show camera preview
                    this.qrScanner.show();
                    window.document.querySelector('ion-app').classList.add('transparent-body');

                    // wait for user to scan something, then the observable callback will be called

                } else if (status.denied) {
                    // camera permission was permanently denied
                    // you must use QRScanner.openSettings() method to guide the user to the settings page
                    // then they can grant the permission from there
                } else {
                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                }
            })
            .catch((e: any) => console.log('Error is', e));
    }

    public logout() {
        this.authService.logout();
        this.navCtrl.setRoot(LoginPage);
        this.toastService.showToast('Logout success!');
    }

    public detail(deviceMac: any, deviceName: any) {
        this.navCtrl.push(DevicePage, {
            deviceMac: deviceMac,
            deviceName: deviceName
        });
    }
}
