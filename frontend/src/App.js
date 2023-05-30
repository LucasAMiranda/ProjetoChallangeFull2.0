import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from "./components/Menu"; 
import  './App.css';
import Vendas from './components/Vendas';
import NovaVenda from './components/NovaVenda';
import EditarVenda from './components/EditarVenda';
import Comissoes from './components/Comissoes';

const App = () => {
  return (
    <Router>
      <div>
        <Menu />
        <Routes>
          <Route path="/" element={<Vendas />} />
          <Route path="/nova-venda" element={<NovaVenda />} />
          <Route path="/editar-venda" element={<EditarVenda />} />
          <Route path="/comissoes" element={<Comissoes />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;