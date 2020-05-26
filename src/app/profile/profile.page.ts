import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { IUser } from '../shared/types/user.interface';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';
export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public loggedIn$: Observable<boolean>;
  public user$: Observable<IUser>;
  public images: Observable<MyData[]>;
  public profilePictureUrl;

  private user: IUser;
  private imageCollection: AngularFirestoreCollection<MyData>;

  constructor(
    private storage: AngularFireStorage,
    // private firebase: AngularFirebase,
    private database: AngularFirestore,
    private authService: AuthService,
    private camera: Camera,
  ) {
    // Set collection where our documents/ images info will save
    this.imageCollection = database.collection<MyData>('profilePictures');
    this.images = this.imageCollection.valueChanges();
  }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
    this.loggedIn$ = this.authService.loggedIn$;

    this.user$.pipe(filter((u) => u !== null && u !== undefined)).subscribe((user) => {
      this.user = user;
      // Points to the root reference
      const storageRef = firebase.storage().ref();
      // Points to 'images'
      const imagesRef = storageRef.child('profilePictures');
      // Points to 'images/space.jpg'
      // Note that you can use variables to create child values
      const fileName = `${user.uid}.jpg`;
      const spaceRef = imagesRef.child(fileName);

      // File path is 'images/space.jpg'
      const path = spaceRef.fullPath;
      const fullPath = `gs://${environment.firebase.storageBucket}/${path}`;
      const gsReference = firebase.storage().refFromURL(fullPath);

      gsReference
        .getDownloadURL()
        .then((url) => {
          this.profilePictureUrl = url;
        })
        .catch((error) => {
          this.profilePictureUrl = null;
        });
    });
  }

  public logout(): void {
    this.authService
      .signOut()
      .then((res) => {
        console.log('LOGOUT SUCCESS');
      })
      .catch((err) => {
        console.log('LOGOUT ERR');
      });
  }

  // public addImagetoDB(image: MyData) {
  //   // Create an ID for document
  //   const id = this.database.createId();
  //
  //   // Set document id with value in database
  //   this.imageCollection
  //     .doc(id)
  //     .set(image)
  //     .then((resp) => {
  //       console.log('OK', resp);
  //     })
  //     .catch((error) => {
  //       console.log('error ' + error);
  //     });
  // }

  public openGallery(): void {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: 0,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        // Create a root reference
        const storageRef = firebase.storage().ref();
        // Create a reference to 'mountains.jpg'
        const mountainsRef = storageRef.child(`${this.user.uid}.jpg`);
        // Create a reference to 'images/mountains.jpg'
        const imageRef = firebase.storage().ref().child(`${this.user.uid}.jpg`);

        imageRef.putString(imageData, 'base64url').then((snapshot) => {
          console.log('Uploaded a base64url string!');
        });
      },
      (err) => {
        // Handle error
      },
    );
  }
}
