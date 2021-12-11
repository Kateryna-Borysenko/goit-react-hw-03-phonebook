import React, { Component } from 'react';
import s from './ContactForm.module.css';
import { nanoid } from 'nanoid';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;

    //прилитит в App массив сontacts новый контакт - объект
    // id:"WIKCSp5KiPxetbZEQIvXT"
    // name:"Kateryna Borysenko"
    // number:"455-25-33"
    this.props.onSubmit({
      id: nanoid(),
      name, //aналог записи name: name
      number,
    });
    this.reset();
  };

  onChangeInput = e => {
    const { name, value } = e.target;
    //когда пользователь введет данные в состояние запишется значение по ключу
    this.setState({ [name]: value });
  };

  // важно влиять на состояние через .setState
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={s.contacsForm} onSubmit={this.onSubmit}>
        <label className={s.label}>
          <span className={s.title}>Name:</span>
          <input
            className={s.textField}
            type="text"
            onChange={this.onChangeInput}
            value={name}
            name="name"
            placeholder="example: Borysenko Kateryna"
            required
          />
        </label>

        <label className={s.label}>
          <span className={s.title}>Number:</span>
          <input
            className={s.textField}
            type="tel"
            onChange={this.onChangeInput}
            value={number}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            placeholder="example: 645-17-79"
            required
          />
        </label>

        <button type="submit" className={s.addBtn}>
          Add Contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
