import fs from 'fs/promises';

export async function getStoredNotes(){
    const rawFileContent = await fs.readFile('Notes.json', {encoding: 'utf-8'});
    const data = JSON.parse(rawFileContent);
    return data.notes ?? [];
}

export function storedNotes(notes){
    return fs.writeFile('Notes.json', JSON.stringify({notes: notes || []}));
}
