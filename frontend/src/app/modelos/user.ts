export class User{
  _id?: Number;
  nombre?: String;
  apellido?: String;
  pais?: String;
  ciudad?: String;
  direccion?: String;
  telefono?: String;
  email?: String;
  contraseña?: String;
  roles?:Array<any>;
  pedidos?:Array<any>;
  verificado?: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
