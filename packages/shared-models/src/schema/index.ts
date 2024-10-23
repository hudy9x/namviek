import mongoose, { Document, Schema, Types } from 'mongoose';
import { ICell } from './type';

export type ICellWithoutId = Pick<ICell, 'value' | 'rowId' | 'fieldId'>

const cellSchema = new Schema<ICell>({
  value: mongoose.Schema.Types.Mixed,
  rowId: { type: mongoose.Schema.Types.ObjectId, ref: 'Row' },
  fieldId: { type: mongoose.Schema.Types.ObjectId, ref: 'Field' }
});

export const CellModel = mongoose.models.Cell || mongoose.model('Cell', cellSchema);
