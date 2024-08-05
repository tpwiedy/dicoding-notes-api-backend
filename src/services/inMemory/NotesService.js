/* eslint no-underscore-dangle: ["error", { "allow": ["_notes", "_pool"] }] */
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    // Generate a unique ID for the note
    const id = nanoid(16);

    // Generate the creation and update timestamps
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    // Create the new note object
    const newNote = {
      title, tags, body, id, createdAt, updatedAt,
    };

    // Add the new note to the list of notes
    this._notes.push(newNote);

    // Check if the note was successfully added
    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    // Throw an error if the note could not be added
    if (!isSuccess) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    // Return the ID of the newly added note
    return id;
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.filter((n) => n.id === id)[0];
    if (!note) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }
    return note;
  }

  editNoteById(id, { title, tags, body }) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._notes[index] = {
      ...this._notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }

    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;
