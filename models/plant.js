let mongoose = require('mongoose')

let Schema = mongoose.Schema

let plantSchema = new Schema({
    name:           {type:String, required: true, unique: true, minlength:3, maxlength:20},
    description:    {type:String, required: true, maxlength:250},
    servo:          {type:Number, required: true, unique: true},
    sensor_1:       {type:Number, required: true, default:-1}, // Humedad
    sensor_2:       {type:Number, required: true, default:-1}, // Temperatura
    //ultimo_riegoD:  {type:Number, required: false}, // Date
    ultimo_riego:   {type:Date, required:false},    // Data
    tiempo_abertura:{type:Number,required:true, default:2}, // Segundos
    conditions:     [{type:String,required:true}],
    enabled:        {type: Boolean, required:true, default: true},
    photo:          {type:Buffer, contentType:String, required:true, default:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDQ4IDQ4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM4QkMzNEEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMjAuMiwxNS40YzQsMi41LDMuOCw4LjYsMy44LDguNiIvPjxwYXRoIGZpbGw9IiM4QkMzNEEiIGQ9Ik0yMC4yLDdDMTUuNCw0LjYsNy45LDcuMyw2LDhjMi44LDEuNywyLjQsMTAuOSw3LjUsMTIuNmMzLjYsMS4yLDYuNC0wLjIsNi43LTUuMkMyNC4yLDEzLjEsMjMuNiw4LjcsMjAuMiw3eiIvPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzhCQzM0QSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0yOSwxNmMwLDAtNSwwLjktNSw4djMiLz48cGF0aCBmaWxsPSIjOEJDMzRBIiBkPSJNMzAuMiw4LjNDMzQuNiw2LjksNDAuNiwxMSw0MiwxMmMtMi42LDEtNC4zLDkuMy04LjksOS45Yy0zLjIsMC40LTQuOS0xLjMtNC4xLTUuOUMyNS40LDEzLjIsMjcuMSw5LjIsMzAuMiw4LjN6Ii8+PC9nPjxnPjxwYXRoIGZpbGw9IiM2ODlGMzgiIGQ9Ik0xMy41LDIwLjZDOC40LDE4LjksOC44LDkuNyw2LDhjMCwwLDAsMCwwLDBjMi41LDAuMiw2LjEsMi40LDE0LjIsNy40YzAsMCwwLDAsMCwwQzE5LjksMjAuNCwxNy4yLDIxLjgsMTMuNSwyMC42eiIvPjxwYXRoIGZpbGw9IiM2ODlGMzgiIGQ9Ik0zMy4yLDIxLjljNC41LTAuNiw2LjItOC45LDguOS05LjljMCwwLDAsMCwwLDBjLTIuMS0wLjMtNS40LDAuOS0xMyw0YzAsMCwwLDAsMCwwQzI3LjQsMjAuNSwyOS45LDIyLjQsMzMuMiwyMS45eiIvPjwvZz48cG9seWdvbiBmaWxsPSIjRTY0QTE5IiBwb2ludHM9IjEzLDI3IDE2LDQyIDMyLDQyIDM1LDI3ICIvPjxwYXRoIGZpbGw9IiNCRjM2MEMiIGQ9Ik0zNSwzMEgxM2MtMC42LDAtMS0wLjUtMS0xdi00aDI0djRDMzYsMjkuNSwzNS41LDMwLDM1LDMweiIvPjwvc3ZnPg=="},
})

module.exports = mongoose.model('plant', plantSchema)