import s from './ContactList.module.css';
import Paper from 'common/Paper/Paper';

const ContactList = ({ contacts, onDelete }) => (
  <ul className={s.contactList}>
    {contacts.map(({ id, name, number }) => (
      <Paper key={id}>
        <li className={s.contactListItem}>
          <p className={s.contactName}>{name}:</p>
          <p className={s.contactNumber}>{number}</p>
        </li>
        <button
          type="button"
          className={s.deleteBtn}
          // первдала в props onDelete={this.deleteContact}
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </Paper>
    ))}
  </ul>
);

export default ContactList;
