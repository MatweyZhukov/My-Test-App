import './modal.scss';

import { ThemeProvider } from 'styled-components';
import { darkTheme, greenTheme, GlobalStyles } from './Theme';
import { Component } from 'react';

import question from '../../icons/question.png'
import close from '../../icons/close.png';

class Modal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			theme: localStorage.getItem('theme')
		};
	};

	componentDidUpdate() {
		localStorage.setItem('theme', this.state.theme);
	};

	switchTheme = () => {
		this.setState(({ theme }) => {
			if (theme === 'green') {
				return {
					theme: 'black'
				};
			} else {
				return {
					theme: 'green'
				};
			}
		});
	};

	onCloseModal = () => {
		document.body.style.cssText = `
			overflow-y: auto;
		`;
		document.querySelector('.modal__content').style.cssText = `
			transform: scale(0);
		`;
		document.querySelector('.modal').style.cssText = `
			opacity: 0; 
			pointer-events: none;
		`;

		setTimeout(() => {
			document.querySelectorAll('.item').forEach(item => {
				item.style.cssText = `
					position: relative;
					left: 0;
					opacity: 1;
				`;
			});
		}, 300);
	};

	render() {
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') this.onCloseModal();
		});
		window.addEventListener('click', (e) => {
			if (e.target === document.querySelector('.modal')) this.onCloseModal();
		});

		return (
			<ThemeProvider theme={this.state.theme === "green" ? greenTheme : darkTheme}>
				<GlobalStyles />
				<div className="modal">
					<div className="modal__content">
						<div className="close">
							<button onClick={this.onCloseModal}>
								<img src={close} alt="close" />
							</button>
						</div>
						<div className="title">
							<h1 className="title__text">This Is an instruction</h1>
						</div>
						<div className="main__text">
							<div className="main__text__content">
								<p
									className="text">
									Hey, my name is Matwey, and this is my own app.
								</p>
								<p
									className="text">
									If you wanna add some items in the list bellow,
									you should enter the name of item <b>(it should be more than 3 symbols and less than 20 symbols)</b>, and then push the button where the plus is.
								</p>
								<p className='text'><b>!...Remember, your items will save in browser, don't worry. They won't be removed.</b></p>
								<div className="block__bottom">
									<img className='modal__img' src={question} alt="question" />
									<p className="text"></p>
									<button
										className='button-theme'
										onClick={this.switchTheme}>Switch theme</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ThemeProvider>
		);
	}
};

export default Modal;