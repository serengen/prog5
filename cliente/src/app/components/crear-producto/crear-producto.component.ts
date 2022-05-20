import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'Crear producto';
  id: string | null;
  constructor(private fb: FormBuilder, 
              private router: Router, 
              private toastr: ToastrService,
              private _productServices: ProductoService,
              private aRouter: ActivatedRoute) {
    this.productoForm = this.fb.group({
      nombre: ['',Validators.required],
      categoria: ['',Validators.required],
      ubicacion: ['',Validators.required],
      precio: ['',Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    console.log(this.productoForm);
    
    console.log(this.productoForm.get('nombre')?.value);

    const producto: Producto ={
      nombre: this.productoForm.get('nombre')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }
    if(this.id == null){
      this._productServices.crearProducto(producto).subscribe(data =>{
        this.toastr.success('Producto Agregado','Exito');
        this.router.navigate(["/"]);
        }, error =>{
          console.log(error);
          this.productoForm.reset();
        })
      //editar
    }else{
      this._productServices.editarProducto(this.id, producto).subscribe(data=>{
        this.toastr.success('Producto Modificado','Exito');
        this.router.navigate(["/"]);
        }, error =>{
          console.log(error);
          this.productoForm.reset();
        })
    }
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Producto';
      this._productServices.obtenerProducto(this.id).subscribe(data=>{
        this.productoForm.setValue({
          nombre: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        })
      })
    }
  }
}
