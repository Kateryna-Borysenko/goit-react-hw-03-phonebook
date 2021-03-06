import { Component } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import * as storage from 'services/localStorage';
import image from 'images/image.jpg';
import s from './App.module.css';
import Container from 'common/Container/Container';

const STORAGE_KEY = 'contacts';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = storage.get(STORAGE_KEY);
    //eсли есть обновлённые данные, а не null
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      //проверка были ли изменения
      storage.save(STORAGE_KEY, contacts);
    }
  }

  onSubmit = newContact => {
    const { id, name, number } = newContact;

    //проверка на одинаковые контакты
    const isInContactList = contact => contact.name === newContact.name;

    this.state.contacts.some(isInContactList)
      ? alert(`${newContact.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, { id, name, number }],
        }));
  };

  onChangeInput = e => {
    this.setState({ filter: e.target.value });
  };

  //поиск совпадений в списке контактов
  onFilterChange = () => {
    const value = this.state.filter;
    return this.state.contacts.filter(elem =>
      elem.name.toLowerCase().includes(value.toLowerCase()),
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(elem => elem.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <Container>
        <img className={s.image} src={image} alt="Woman" />
        <div className={s.contantWrap}>
          <h1 className={s.title}>Phonebook</h1>
          <ContactForm onSubmit={this.onSubmit} contacts={contacts} />
          <h2 className={s.subtitle}>Contacts:</h2>
          {contacts.length > 1 && (
            <Filter value={filter} onChange={this.onChangeInput} />
          )}
          {!contacts.length && <span>There are not contacts yet</span>}
          <ContactList
            contacts={this.onFilterChange()}
            onDelete={this.deleteContact}
          />
        </div>
      </Container>
    );
  }
}
export default App;
