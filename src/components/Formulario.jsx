import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fechaAlta, setFechaAlta] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);

  useEffect( () => {
    if ( Object.keys(paciente).length > 0 ) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFechaAlta(paciente.fechaAlta);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion del Formulario
    if ([nombre, propietario, email, fechaAlta, sintomas].includes('')) {
      setError(true);
      return;
    }
    setError(false);

    // Objeto de Paciente

    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fechaAlta,
      sintomas,
    };

    if ( paciente.id ) {
      // Editando
      objetoPaciente.id = paciente.id
      
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )

      setPacientes(pacientesActualizados)
      setPaciente({})

    } else {
      // Nuevo registro
      objetoPaciente.id = generarId(),
      setPacientes([...pacientes, objetoPaciente]);
    }

    // Reiniciar formulario
    setTimeout(() => {
      setNombre("");
      setPropietario("");
      setEmail("");
      setFechaAlta("");
      setSintomas("");
    }, 1000);
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg py-8 px-5 mb-5"
      >
        {error && <Error>Todos los campos son obligatorios</Error>}

        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="flex text-gray-700 uppercase font-bold"
          >
            <p>
              Nombre mascota: {""}
              <span className="text-indigo-600 font-bold">{nombre}</span>
            </p>
          </label>

          <input
            id="mascota"
            type="text"
            placeholder="Nombre de tu mascota"
            className="w-full border-2 mt-2 p-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            <p>
              Nombre del propietario: {""}
            </p>
          </label>

          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="w-full border-2 mt-2 p-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email:
          </label>

          <input
            id="email"
            type="email"
            placeholder="Correo electrónico"
            className="w-full border-2 mt-2 p-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Fecha de Alta:
          </label>

          <input
            id="alta"
            type="date"
            className="w-full border-2 mt-2 p-2 placeholder-gray-400 rounded-md"
            value={fechaAlta}
            onChange={(e) => setFechaAlta(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Sintomas:
          </label>

          <textarea
            id="sintomas"
            className="w-full border-2 p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-gray-100 uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-opacity"
          value={ paciente.id ? 'Editar paciente' : 'Agregar paciente' }
        />
      </form>
    </div>
  );
};

export default Formulario;
