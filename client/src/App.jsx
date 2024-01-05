import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { api } from './api/http-requester.js';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { StateProvider } from './contexts/StateContext.jsx';

import { Login } from './pages/Auth/Login.jsx';
import { Register } from './pages/Auth/Register.jsx';
import { Dashboard } from './pages/Product/Dashboard.jsx';
import { Table1 } from './components/Table1.jsx';
import { Table2 } from './components/Table2.jsx';
import { Table3 } from './components/Table3.jsx';
import { Card } from './components/Card.jsx';
import { Modal } from './components/Modal.jsx';
import { Header } from './components/Header.jsx';
import { SideBar } from './components/SideBar.jsx';
import { Layout } from './components/Layout.jsx';
import { SearchInput } from './components/SearchInput.jsx';
import { AlertSuccess } from './components/Alerts/AlertSuccess.jsx';
import { AlertInfo } from './components/Alerts/AlertInfo.jsx';
import { AlertWarning } from './components/Alerts/AlertWarning.jsx';
import { AlertError } from './components/Alerts/AlertError.jsx';
import { ButtonPrimary } from './components/Buttons/ButtonPrimary.jsx';
import { ButtonRefresh } from './components/Buttons/ButtonRefresh.jsx';
import { ButtonDots } from './components/Buttons/ButtonDots.jsx';
import { Pagination } from './components/Pagination.jsx';
import { Form1 } from './components/Forms/Form1.jsx';
import { Form2 } from './components/Forms/Form2.jsx';
import { ProductProvider } from './contexts/ProductsContext.jsx';

function App() {

	return (
		<AuthProvider>
			<StateProvider>
				<ProductProvider>
					<Layout>
						<Routes>
							<Route path='/' element={<Navigate to='/dashboard' />} />
							<Route path='/dashboard' element={<Dashboard />} />
							<Route path='/ui-elements' element={<AlertSuccess />} />
							<Route path='/tables' element={<Table1 />} />
							<Route path='/forms' element={<Form1 />} />
							<Route path='/cards' element={<Card />} />
							<Route path='/modal' element={<Modal />} />
							<Route path='/blank' element={<h2>Blank Page</h2>} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
						</Routes>
					</Layout>
				</ProductProvider>
			</StateProvider>
		</AuthProvider>
	);
}

export default App;
