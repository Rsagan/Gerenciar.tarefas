import React, { useState, useEffect } from 'react';
import { db, auth } from './firebaseConnection';
import {
  doc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

function App() {
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idAtual, setIdAtual] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tarefas"), (snapshot) => {
      const tarefasData = [];
      snapshot.forEach(doc => {
        tarefasData.push({ id: doc.id, ...doc.data() });
      });
      setTarefas(tarefasData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        setUsuario(usuario);
      } else {
        setUsuario(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddTarefa = async () => {
    if (!editando) {
      await addDoc(collection(db, "tarefas"), {
        texto: tarefa,
        concluido: false
      });
      setTarefa('');
    } else {
      await updateDoc(doc(db, "tarefas", idAtual), {
        texto: tarefa
      });
      setTarefa('');
      setEditando(false);
      setIdAtual('');
    }
  };

  const handleEditTarefa = (tarefa) => {
    setEditando(true);
    setTarefa(tarefa.texto);
    setIdAtual(tarefa.id);
  };

  const handleDeleteTarefa = async (id) => {
    await deleteDoc(doc(db, "tarefas", id));
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const handleSignUp = async () => {
    await createUserWithEmailAndPassword(auth, email, senha);
  };

  const handleSignIn = async () => {
    await signInWithEmailAndPassword(auth, email, senha);
  };

  return (
    <div>
      <h1>Gerencie suas tarefas</h1>
      {!usuario ? (
        <div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
          <button onClick={handleSignUp}>Cadastrar</button>
          <button onClick={handleSignIn}>Entrar</button>
        </div>
      ) : (
        <div>
          <button onClick={handleSignOut}>Sair</button>
          <input value={tarefa} onChange={(e) => setTarefa(e.target.value)} placeholder="Nova Tarefa" />
          <button onClick={handleAddTarefa}>{editando ? "Atualizar" : "Adicionar"}</button>
          <ul>
            {tarefas.map((tarefa) => (
              <li key={tarefa.id}>
                {tarefa.texto}
                <button onClick={() => handleEditTarefa(tarefa)}>Editar</button>
                <button onClick={() => handleDeleteTarefa(tarefa.id)}>Excluir</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;