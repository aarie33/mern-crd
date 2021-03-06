import React, { Component } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
	state = {
		modal: false,
		name: ''
	}

	static propTypes = {
		isAuthenticated: PropTypes.bool
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit = e => {
		e.preventDefault();

		const newItem = {
			name: this.state.name
		}

		// Add item via addItem action
		this.props.addItem(newItem);

		this.toggle();
	}

	render(){
		return (
			<div>
				{ this.props.isAuthenticated ? 
					<Button 
						color="dark"
						className="mb-3"
						onClick={this.toggle}>
						Add Item
					</Button>
					: 'Please login to manage data' }

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>
						Add To Shopping List
					</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="item">Item</Label>
								<Input type="text" name="name" id="item_name" placeholder="Add Shopping Item" onChange={this.onChange} required/>

								<Button color="dark" className="mt-3 btn-block">Add Item</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
			);
	}
}

const mapStateToProps = (state) => ({
	item: state.item,
	isAuthenticated: state.auth.isAuthenticated
});


export default connect(
	mapStateToProps, {addItem})
(ItemModal);