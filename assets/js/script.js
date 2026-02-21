// Lección #1: Introducción (consola + prompt + alert)

function log(msg) {
  console.log(msg);
}

function pedirNombre() {
  return prompt('¿Cuál es tu nombre?');
}

function validarNombre(nombre) {
  if (nombre === null) return { ok: false, motivo: 'cancelado'};
  if (nombre.trim() === "") return { ok: false, motivo: 'vacio'};
  return { ok: true, valor: nombre.trim() };
}

function obtenerNombreValido() {
  const nombre = pedirNombre();
  const validacion = validarNombre(nombre);

  if (!validacion.ok) {
    if (validacion.motivo === 'cancelado') {
      log('⚠️ El usuario canceló el ingreso del nombre.');
      alert('No ingresaste tu nombre (cancelaste). Fin del programa.');
    } else {
      log('⚠️ El usuario no escribió su nombre.');
      alert('No escribiste tu nombre. Fin del programa.');
    }
    return null;
  }

  return validacion.valor;
}

function saludar(nombre) {
  log('👋 Hola,' + nombre + '¡Vamos a programar!');
  alert("Hola " + nombre + " 😊 Bienvenid@ al proyecto.");
}

// Lección #2: Variables + validación numérica (prompt -> Number)
function pedirNumero(mensaje) {
  while (true) {
    const entrada = prompt(mensaje);
    if (entrada === null) return null;

    const numero = Number(entrada);
    if (!Number.isNaN(numero) && Number.isFinite(numero)) return numero;

    alert('⚠️ Ingresa un número válido (ej: 10, 3.5).');
  }
}

// Lección #3: Arreglos y ciclos (for / while + filtro)
function recorrerConFor(arreglo) {
  log('🔁 Recorriendo con FOR:');
  for (let i = 0; i < arreglo.length; i++) {
    log(`- índice ${i}: ${arreglo[i]}`);
  }
}

function recorrerConWhile(arreglo) {
  log('🔁 Recorriendo con WHILE:');
  let idx = 0;
  while (idx < arreglo.length) {
    log(`- índice ${idx}: ${arreglo[idx]}`);
    idx++;
  }
}

function filtrar(arreglo, tipo, valor) {
  const filtrados = [];
  for (let i = 0; i < arreglo.length; i++) {
    if (tipo === 'mayor' && arreglo[i] > valor) filtrados.push(arreglo[i]);
    if (tipo === 'menor' && arreglo[i] < valor) filtrados.push(arreglo[i]);
  }
  return filtrados;
}

function ejecutarArreglosYCiclos() {
  log('📦 Arreglos y ciclos (Lección #3)');

  const numeros = [12, 5, 9, 20, 3, 15];
  log('📦 Arreglo de números:' + JSON.stringify(numeros));

  recorrerConFor(numeros);
  recorrerConWhile(numeros);

  const tipoFiltro = prompt('¿Cómo quieres filtrar?\n1) Mayores que...\n2) Menores que...');
  if (tipoFiltro === null) {
    alert('Cancelaste el filtro. Fin de arreglos y ciclos.');
    return;
  }

  const valor = pedirNumero('Ingresa el número de referencia para filtrar:');
  if (valor === null) {
    alert('Cancelaste el número del filtro. Fin de arreglos y ciclos.');
    return;
  }

  let tipo = null;
  switch (tipoFiltro) {
    case "1":
      tipo = "mayor";
      break;
    case "2":
      tipo = "menor";
      break;
    default:
      alert("⚠️ Opción inválida de filtro.");
      return;
  }

  const resultadoFiltrado = filtrar(numeros, tipo, valor);
  log(`✅ Filtro (${tipo}) con valor ${valor}: ` + JSON.stringify(resultadoFiltrado));

  if (resultadoFiltrado.length === 0) {
    alert("No se encontraron resultados con ese filtro.");
  } else {
    alert("Resultado del filtro: " + resultadoFiltrado.join(", "));
  }
}

// Lección #4: Funciones (calculadora modular)
function sumar(a, b) {
  return a + b;
}
function restar(a, b) {
  return a - b;
}
function multiplicar(a, b) {
  return a * b;
}
function dividir(a, b) {
  if (b === 0) return null;
  return a / b;
}

function calcular(opcion, a, b) {
  switch (opcion) {
    case "1":
      return sumar(a, b);
    case "2":
      return restar(a, b);
    case "3":
      return multiplicar(a, b);
    case "4":
      return dividir(a, b);
    default:
      return undefined;
  }
}

// Lección #5: Objetos (usuario + operación) + arreglo de objetos (historial)
function crearUsuario(nombre) {
  return {
    nombre,
    nivel: 1,
    puntos: 0,

    mostrarPerfil() {
      log(`👤 Usuario: ${this.nombre} | Nivel: ${this.nivel} | Puntos: ${this.puntos}`);
    },

    agregarPuntos(cantidad) {
      this.puntos += cantidad;
    },

    actualizarNivel() {
      this.nivel = Math.floor(this.puntos / 30) + 1;
    },
  };
}

function crearOperacion(tipo, a, b, resultado) {
  return {
    tipo,
    a,
    b,
    resultado,

    descripcion() {
      return `${this.tipo}: ${this.a} y ${this.b} = ${this.resultado}`;
    },
  };
}

function ejecutarCalculadora(historialOperaciones) {
  log("🧮 Calculadora (Lección #4) + Historial (Lección #5)");

  const nombresOperacion = {
    "1": "Suma",
    "2": "Resta",
    "3": "Multiplicación",
    "4": "División",
  };

  while (true) {
    const a = pedirNumero('Ingresa el primer número:');
    if (a === null) {
      alert('Cancelaste el primer número. Fin de la calculadora.');
      return;
    }

    const b = pedirNumero("Ingresa el segundo número:");
    if (b === null) {
      alert('Cancelaste el segundo número. Fin de la calculadora.');
      return;
    }

    const opcion = prompt(
      "Elige una operación:\n1) Suma\n2) Resta\n3) Multiplicación\n4) División"
    );
    if (opcion === null) {
      alert('Cancelaste la operación. Fin de la calculadora.');
      return;
    }

    const resultado = calcular(opcion, a, b);

    if (resultado === undefined) {
      alert('⚠️ Opción inválida.');
    } else if (resultado === null) {
      alert('❌ No se puede dividir por 0.');
      log('❌ Intento de división por 0.');
    } else {
      const tipo = nombresOperacion[opcion] || 'Operación';
      const opObj = crearOperacion(tipo, a, b, resultado);
      historialOperaciones.push(opObj);

      log('✅' + opObj.descripcion());
      alert('✅ El resultado es:' + resultado);

      if (a > b) log('📌 El primer número es mayor.');
      else if (b > a) log('📌 El segundo número es mayor.');
      else log('📌 Ambos números son iguales.');
    }

    const otra = prompt('¿Quieres hacer otra operación? (s/n)');
    if (otra === null) return;
    if (otra.trim().toLowerCase() !== "s") break;
  }
}

function ejecutarObjetos(nombre, historialOperaciones) {
  log('🧩 Objetos (Lección #5)');

  const usuario = crearUsuario(nombre);

  usuario.agregarPuntos(historialOperaciones.length * 10);
  usuario.actualizarNivel();
  usuario.mostrarPerfil();

  if (historialOperaciones.length === 0) {
    log('📭 No hay operaciones en el historial.');
    alert('No hay operaciones guardadas en el historial.');
    return;
  }

  log('📚 Historial (forEach):');
  historialOperaciones.forEach((op, i) => {
    log(`${i + 1}. ${op.descripcion()}`);
  });

  const resumen = historialOperaciones.map((op) => op.descripcion());
  log("🧾 Resumen (map): " + resumen.join(" | "));

  alert("✅ Historial guardado. Revisa la consola (F12) para verlo completo.");
}

// MAIN
function main() {
  log("✅ Bienvenida/o al Proyecto: Aplicación de consola en JavaScript");

  const nombre = obtenerNombreValido();
  if (!nombre) return;

  saludar(nombre);

  const historialOperaciones = [];

  ejecutarCalculadora(historialOperaciones);
  ejecutarArreglosYCiclos();
  ejecutarObjetos(nombre, historialOperaciones);

  log("🏁 Proyecto finalizado.");
}

main();