export class User{
  _id?: Number;
  nombre?: String;
  apellido?: String;
  pais?: String;
  ciudad?: String;
  telefono?: String;
  email?: String;
  contraseña?: String;
  roles?:Array<any>;
  verificado?: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
