const { DataService } = require("../../service/dataService");
const { Note } = require("../../model/Note");

const typeDefs = `
    type Note {
        id: String!
        note: String
        pageId: String!
        createdAt: String
        updatedAt: String
    }

    type PaginatedNotes {
        id: String!
        notes: [Note]
        noteMeta: PaginatedMeta
    }

    input NoteInput {
        note: String
    }
`;

const noteService = new DataService("note", Note);

const resolvers = {
    createNote: async (_, args) => {
        const { pageId, data } = args;

        try {
            const createdData = await noteService.create({ pageId, ...data });
            return createdData;
        } catch (err) {
            return err;
        }
    },
    updateNote: async (_, args) => {
        const { id, data } = args;

        try {
            const updatedNote = await noteService.update(id, data);
            return updatedNote;
        } catch (err) {
            return err;
        }
    },
    deleteNote: async (_, args) => {
        const { id } = args;

        try {
            const deletedNoteObj = noteService.delete(id);
            return deletedNoteObj;
        } catch (err) {
            return err;
        }
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
