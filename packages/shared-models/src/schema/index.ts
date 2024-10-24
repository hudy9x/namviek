import mongoose, { Document, Schema, Model } from 'mongoose';

// Enums
export enum UserStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE'
}

export enum MemberRole {
  GUEST = 'GUEST',
  MEMBER = 'MEMBER',
  MANAGER = 'MANAGER',
  LEADER = 'LEADER'
}

export enum OrganizationRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  MEMBER = 'MEMBER'
}

export enum InvitationStatus {
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  INVITING = 'INVITING'
}

export enum TaskPriority {
  URGENT = 'URGENT',
  HIGH = 'HIGH',
  NORMAL = 'NORMAL',
  LOW = 'LOW'
}

export enum StatusType {
  DONE = 'DONE',
  INPROCESS = 'INPROCESS',
  TODO = 'TODO'
}

export enum ActivityObjectType {
  TASK = 'TASK',
  PROJECT = 'PROJECT'
}

export enum OrgStorageType {
  AWS_S3 = 'AWS_S3',
  DIGITAL_OCEAN_S3 = 'DIGITAL_OCEAN_S3'
}

export enum CounterType {
  TASK = 'TASK',
  PROJECT = 'PROJECT',
  ORGANIZATION = 'ORGANIZATION'
}

export enum TaskType {
  TASK = 'TASK',
  BUG = 'BUG',
  NEW_FEATURE = 'NEW_FEATURE',
  IMPROVEMENT = 'IMPROVEMENT'
}

export enum FileType {
  FILE = 'FILE',
  FOLDER = 'FOLDER'
}

export enum FileOwnerType {
  TASK = 'TASK',
  DISCUSSION = 'DISCUSSION',
  DOCUMENT = 'DOCUMENT'
}

export enum ProjectViewType {
  DASHBOARD = 'DASHBOARD',
  LIST = 'LIST',
  BOARD = 'BOARD',
  CALENDAR = 'CALENDAR',
  TIMELINE = 'TIMELINE',
  GOAL = 'GOAL',
  TEAM = 'TEAM',
  ACTIVITY = 'ACTIVITY'
}

export enum StatsType {
  PROJECT_TASK_BY_DAY = 'PROJECT_TASK_BY_DAY',
  MEMBER_TASK_BY_DAY = 'MEMBER_TASK_BY_DAY'
}

export enum DashboardComponentType {
  LINE = 'LINE',
  SUMMARY = 'SUMMARY',
  PIE = 'PIE',
  LISTTAB = 'LISTTAB',
  LIST = 'LIST',
  COLUMN = 'COLUMN',
  BURNDOWN = 'BURNDOWN',
  BURNUP = 'BURNUP'
}

export enum ActivityType {
  TASK_CREATED = 'TASK_CREATED',
  TASK_TITLE_CHANGED = 'TASK_TITLE_CHANGED',
  TASK_DESC_CHANGED = 'TASK_DESC_CHANGED',
  TASK_DUEDATE_CHANGED = 'TASK_DUEDATE_CHANGED',
  TASK_ASSIGNEE_ADDED = 'TASK_ASSIGNEE_ADDED',
  TASK_ASSIGNEE_REMOVED = 'TASK_ASSIGNEE_REMOVED',
  TASK_STATUS_CREATED = 'TASK_STATUS_CREATED',
  TASK_STATUS_CHANGED = 'TASK_STATUS_CHANGED',
  TASK_PROGRESS_CHANGED = 'TASK_PROGRESS_CHANGED',
  TASK_PRIORITY_CHANGED = 'TASK_PRIORITY_CHANGED',
  TASK_POINT_CHANGED = 'TASK_POINT_CHANGED',
  TASK_VISION_CHANGED = 'TASK_VISION_CHANGED',
  TASK_COMMENT_CREATED = 'TASK_COMMENT_CREATED',
  TASK_COMMENT_CHANGED = 'TASK_COMMENT_CHANGED',
  TASK_COMMENT_REMOVED = 'TASK_COMMENT_REMOVED',
  TASK_ATTACHMENT_ADDED = 'TASK_ATTACHMENT_ADDED',
  TASK_ATTACHMENT_REMOVED = 'TASK_ATTACHMENT_REMOVED'
}

export const castToObjectId = (id: string) => new mongoose.Types.ObjectId(id)

// Interfaces
export type IUserField = {
  id: string;
  email: string;
  password: string;
  name?: string;
  status?: UserStatus;
  country?: string;
  bio?: string;
  photo?: string;
  dob?: Date;
  settings?: Schema.Types.Mixed;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export type IUser = IUserField & Document

export type IFavoritesField = {
  id: string;
  name: string;
  icon: string;
  link: string;
  uid: mongoose.Types.ObjectId;
  orgId: mongoose.Types.ObjectId;
  type: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export type IFavorites = IFavoritesField & Document

export type IOrganizationField = {
  id: string;
  name: string;
  slug: string;
  cover?: string;
  avatar?: string;
  maxStorageSize?: number;
  desc?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export type IOrganization = IOrganizationField & Document

export type IOrganizationStorageField = {
  id: string;
  type: OrgStorageType;
  config: Schema.Types.Mixed;
  organizationId: mongoose.Types.ObjectId;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export type IOrganizationStorage = IOrganizationStorageField & Document

export type IOrganizationMemberField = {
  id: string;
  uid: mongoose.Types.ObjectId;
  status: InvitationStatus;
  organizationId: mongoose.Types.ObjectId;
  role: OrganizationRole;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export type IOrganizationMember = IOrganizationMemberField & Document

export type ICounterField = {
  id: string;
  type: CounterType;
  counter: number;
}
export type ICounter = ICounterField & Document

export type ITestField = {
  id: string;
  title: string;
  order: number;
}
export type ITest = ITestField & Document

export type ITaskField = {
  id: string;
  title: string;
  desc?: string;
  dueDate?: Date;
  order: number;
  type?: TaskType;
  checklistDone?: number;
  checklistTodos?: number;
  cover?: string;
  plannedStartDate?: Date;
  plannedDueDate?: Date;
  startDate?: Date;
  projectId: mongoose.Types.ObjectId;
  priority?: TaskPriority;
  visionId?: mongoose.Types.ObjectId;
  taskStatusId?: mongoose.Types.ObjectId;
  tagIds: mongoose.Types.ObjectId[];
  assigneeIds: mongoose.Types.ObjectId[];
  fileIds: mongoose.Types.ObjectId[];
  parentTaskId?: mongoose.Types.ObjectId;
  progress?: number;
  done: boolean;
  taskPoint?: number;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}
export type ITask = ITaskField & Document

export type ITaskStatusField = {
  id: string;
  name: string;
  color: string;
  order: number;
  projectId: mongoose.Types.ObjectId;
  type: StatusType;
}
export type ITaskStatus = ITaskStatusField & Document

export type ITaskChecklistField = {
  id: string;
  taskId: mongoose.Types.ObjectId;
  title: string;
  order: number;
  done?: boolean;
  doneAt?: Date;
}
export type ITaskChecklist = ITaskChecklistField & Document

export type ITagField = {
  id: string;
  name: string;
  color: string;
  projectId: mongoose.Types.ObjectId;
}
export type ITag = ITagField & Document

export type ITaskPointField = {
  id: string;
  point: number;
  projectId: mongoose.Types.ObjectId;
  icon?: string;
}
export type ITaskPoint = ITaskPointField & Document

export type ITaskAutomationField = {
  id: string;
  organizationId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  when: Schema.Types.Mixed;
  then: Schema.Types.Mixed;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}
export type ITaskAutomation = ITaskAutomationField & Document

export type ISchedulerField = {
  id: string;
  organizationId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  cronId?: string;
  trigger: Schema.Types.Mixed;
  action: Schema.Types.Mixed;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}
export type IScheduler = ISchedulerField & Document

export type IFileStorageField = {
  id: string;
  organizationId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  name: string;
  keyName: string;
  type: FileType;
  url?: string;
  size?: number;
  mimeType?: string;
  parentId?: string;
  owner?: mongoose.Types.ObjectId;
  ownerType?: FileOwnerType;
  isDeleted?: boolean;
  createdBy?: string;
  createdAt?: Date;
  deletedAt?: Date;
  deletedBy?: string;
}
export type IFileStorage = IFileStorageField & Document

export type IProjectField = {
  id: string;
  name: string;
  projectViewId?: mongoose.Types.ObjectId;
  desc?: string;
  cover?: string;
  icon?: string;
  isArchived?: boolean;
  countMemberTask?: boolean;
  countProjectTask?: boolean;
  createdBy?: string;
  createdAt?: Date;
  organizationId: string;
  updatedBy?: string;
  updatedAt?: Date;
}
export type IProject = IProjectField & Document

export type IProjectSettingNotificationField = {
  id: string;
  uid: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  taskChanges?: boolean;
  remind?: boolean;
  overdue?: boolean;
  createdBy?: string;
  createdAt?: Date;
}
export type IProjectSettingNotification = IProjectSettingNotificationField & Document

export type IProjectViewField = {
  id: string;
  name?: string;
  type: ProjectViewType;
  onlyMe?: boolean;
  icon?: string;
  projectId?: mongoose.Types.ObjectId;
  order?: number;
  data?: Schema.Types.Mixed;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}
export type IProjectView = IProjectViewField & Document

export type IVisionField = {
  id: string;
  name: string;
  projectId?: mongoose.Types.ObjectId;
  organizationId?: mongoose.Types.ObjectId;
  parentId?: mongoose.Types.ObjectId;
  startDate?: Date;
  dueDate?: Date;
  progress?: number;
  createdBy?: string;
  createdAt?: Date;
}
export type IVision = IVisionField & Document

export type IMemberField = {
  id: string;
  projectId: mongoose.Types.ObjectId;
  role: MemberRole;
  uid?: mongoose.Types.ObjectId;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}
export type IMember = IMemberField & Document

export type IStatsField = {
  id: string;
  type: StatsType;
  data?: Schema.Types.Mixed;
  uid?: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId;
  orgId?: mongoose.Types.ObjectId;
  year: number;
  month: number;
  date: number;
  updatedAt?: Date;
}
export type IStats = IStatsField & Document

export type IDashboardComponentField = {
  id: string;
  dashboardId?: mongoose.Types.ObjectId;
  title?: string;
  type?: DashboardComponentType;
  config?: Schema.Types.Mixed;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}
export type IDashboardComponent = IDashboardComponentField & Document

export type IDashboardField = {
  id: string;
  title?: string;
  projectId?: mongoose.Types.ObjectId;
  isDefault?: boolean;
}
export type IDashboard = IDashboardField & Document

export type IActivityField = {
  id: string;
  objectId: string;
  objectType: ActivityObjectType;
  type: ActivityType;
  createdBy: string;
  data?: Schema.Types.Mixed;
  createdAt: Date;
  updatedAt?: Date;
  updatedBy?: string;
}
export type IActivity = IActivityField & Document

export type ICommentField = {
  id: string;
  taskId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  content: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
export type IComment = ICommentField & Document

// Schemas
const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: String,
  status: { type: String, enum: Object.values(UserStatus) },
  country: String,
  bio: String,
  photo: String,
  dob: Date,
  settings: Schema.Types.Mixed,
  createdAt: Date,
  createdBy: String,
  updatedAt: Date,
  updatedBy: String
}, { timestamps: true });

const FavoritesSchema = new Schema<IFavorites>({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  link: { type: String, required: true },
  uid: { type: Schema.Types.ObjectId, required: true },
  orgId: { type: Schema.Types.ObjectId, required: true },
  type: { type: String, required: true },
  createdAt: Date,
  createdBy: String,
  updatedAt: Date,
  updatedBy: String
}, { timestamps: true });

const OrganizationSchema = new Schema<IOrganization>({
  name: { type: String, unique: true, required: true },
  slug: { type: String, unique: true, required: true },
  cover: String,
  avatar: String,
  maxStorageSize: Number,
  desc: String,
  createdAt: Date,
  createdBy: String,
  updatedAt: Date,
  updatedBy: String
}, { timestamps: true });

const OrganizationStorageSchema = new Schema<IOrganizationStorage>({
  type: { type: String, enum: Object.values(OrgStorageType), required: true },
  config: { type: Schema.Types.Mixed, required: true },
  organizationId: { type: Schema.Types.ObjectId, required: true },
  createdAt: Date,
  createdBy: String,
  updatedAt: Date,
  updatedBy: String
}, { timestamps: true });

const OrganizationMembersSchema = new Schema<IOrganizationMember>({
  uid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: Object.values(InvitationStatus), required: true },
  organizationId: { type: Schema.Types.ObjectId, required: true },
  role: { type: String, enum: Object.values(OrganizationRole), required: true },
  createdAt: Date,
  createdBy: String,
  updatedAt: Date,
  updatedBy: String
}, { timestamps: true });

const CounterSchema = new Schema<ICounter>({
  type: { type: String, enum: Object.values(CounterType), required: true },
  counter: { type: Number, required: true }
});

const TestSchema = new Schema<ITest>({
  title: { type: String, required: true },
  order: { type: Number, required: true }
});

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  desc: String,
  dueDate: Date,
  order: { type: Number, required: true },
  type: { type: String, enum: Object.values(TaskType) },
  checklistDone: Number,
  checklistTodos: Number,
  cover: String,
  plannedStartDate: Date,
  plannedDueDate: Date,
  startDate: Date,
  projectId: { type: Schema.Types.ObjectId, required: true },
  priority: { type: String, enum: Object.values(TaskPriority) },
  visionId: Schema.Types.ObjectId,
  taskStatusId: Schema.Types.ObjectId,
  tagIds: [{ type: Schema.Types.ObjectId }],
  assigneeIds: [{ type: Schema.Types.ObjectId }],
  fileIds: [{ type: Schema.Types.ObjectId }],
  parentTaskId: Schema.Types.ObjectId,
  progress: Number,
  done: { type: Boolean, default: false },
  taskPoint: Number,
  createdBy: String,
  createdAt: Date,
  updatedBy: String,
  updatedAt: Date
}, { timestamps: true });

const TaskStatusSchema = new Schema<ITaskStatus>({
  name: { type: String, required: true },
  color: { type: String, required: true },
  order: { type: Number, required: true },
  projectId: { type: Schema.Types.ObjectId, required: true },
  type: { type: String, enum: Object.values(StatusType), default: StatusType.TODO }
});

const TaskChecklistSchema = new Schema<ITaskChecklist>({
  taskId: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  order: { type: Number, required: true },
  done: Boolean,
  doneAt: Date
});

const TagSchema = new Schema<ITag>({
  name: { type: String, required: true },
  color: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, required: true }
});

const TaskPointSchema = new Schema<ITaskPoint>({
  point: { type: Number, required: true },
  projectId: { type: Schema.Types.ObjectId, required: true },
  icon: String
});

const TaskAutomationSchema = new Schema<ITaskAutomation>({
  organizationId: { type: Schema.Types.ObjectId, required: true },
  projectId: { type: Schema.Types.ObjectId, required: true },
  when: { type: Schema.Types.Mixed, required: true },
  then: { type: Schema.Types.Mixed, required: true },
  createdBy: String,
  createdAt: Date,
  updatedBy: String,
  updatedAt: Date
}, { timestamps: true });

const SchedulerSchema = new Schema<IScheduler>({
  organizationId: { type: Schema.Types.ObjectId, required: true },
  projectId: { type: Schema.Types.ObjectId, required: true },
  cronId: String,
  trigger: { type: Schema.Types.Mixed, required: true },
  action: { type: Schema.Types.Mixed, required: true },
  createdBy: String,
  createdAt: Date,
  updatedBy: String,
  updatedAt: Date
}, { timestamps: true });

const FileStorageSchema = new Schema<IFileStorage>({
  organizationId: { type: Schema.Types.ObjectId, required: true },
  projectId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  keyName: { type: String, required: true },
  type: { type: String, enum: Object.values(FileType), required: true },
  url: String,
  size: Number,
  mimeType: String,
  parentId: String,
  owner: Schema.Types.ObjectId,
  ownerType: { type: String, enum: Object.values(FileOwnerType) },
  isDeleted: { type: Boolean, default: false },
  createdBy: String,
  createdAt: Date,
  deletedAt: Date,
  deletedBy: String
}, { timestamps: true });

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  projectViewId: Schema.Types.ObjectId,
  desc: String,
  cover: String,
  icon: String,
  isArchived: { type: Boolean, default: false },
  countMemberTask: { type: Boolean, default: false },
  countProjectTask: { type: Boolean, default: true },
  createdBy: String,
  createdAt: Date,
  organizationId: { type: String, required: true },
  updatedBy: String,
  updatedAt: Date
}, { timestamps: true });

const ProjectSettingNotificationSchema = new Schema<IProjectSettingNotification>({
  uid: { type: Schema.Types.ObjectId, required: true },
  projectId: { type: Schema.Types.ObjectId, required: true },
  taskChanges: { type: Boolean, default: false },
  remind: { type: Boolean, default: false },
  overdue: { type: Boolean, default: false },
  createdBy: String,
  createdAt: Date
}, { timestamps: true });

const ProjectViewSchema = new Schema<IProjectView>({
  name: String,
  type: { type: String, enum: Object.values(ProjectViewType), required: true },
  onlyMe: Boolean,
  icon: String,
  projectId: Schema.Types.ObjectId,
  order: Number,
  data: Schema.Types.Mixed,
  createdBy: String,
  createdAt: Date,
  updatedBy: String,
  updatedAt: Date
}, { timestamps: true });

const VisionSchema = new Schema<IVision>({
  name: { type: String, required: true },
  projectId: Schema.Types.ObjectId,
  organizationId: Schema.Types.ObjectId,
  parentId: Schema.Types.ObjectId,
  startDate: Date,
  dueDate: Date,
  progress: Number,
  createdBy: String,
  createdAt: Date
}, { timestamps: true });

const MembersSchema = new Schema<IMember>({
  projectId: { type: Schema.Types.ObjectId, required: true },
  role: { type: String, enum: Object.values(MemberRole), required: true },
  uid: { type: Schema.Types.ObjectId, ref: 'User' },
  createdBy: String,
  createdAt: Date,
  updatedBy: String,
  updatedAt: Date
}, { timestamps: true });

const StatsSchema = new Schema<IStats>({
  type: { type: String, enum: Object.values(StatsType), required: true },
  data: Schema.Types.Mixed,
  uid: Schema.Types.ObjectId,
  projectId: Schema.Types.ObjectId,
  orgId: Schema.Types.ObjectId,
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  date: { type: Number, required: true },
  updatedAt: Date
});

const DashboardComponentSchema = new Schema<IDashboardComponent>({
  dashboardId: { type: Schema.Types.ObjectId, ref: 'Dashboard' },
  title: String,
  type: { type: String, enum: Object.values(DashboardComponentType) },
  config: Schema.Types.Mixed,
  createdBy: String,
  createdAt: Date,
  updatedBy: String,
  updatedAt: Date
}, { timestamps: true });

const DashboardSchema = new Schema<IDashboard>({
  title: { type: String, default: 'Untitled' },
  projectId: Schema.Types.ObjectId,
  isDefault: { type: Boolean, default: false }
});

const ActivitySchema = new Schema<IActivity>({
  objectId: { type: String, required: true },
  objectType: { type: String, enum: Object.values(ActivityObjectType), required: true },
  type: { type: String, enum: Object.values(ActivityType), required: true },
  createdBy: { type: String, required: true },
  data: Schema.Types.Mixed,
  createdAt: { type: Date, required: true },
  updatedAt: Date,
  updatedBy: String
});

const CommentSchema = new Schema<IComment>({
  taskId: { type: Schema.Types.ObjectId, required: true },
  projectId: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});

// Array of all schemas
const allSchemas = [
  UserSchema, FavoritesSchema, OrganizationSchema, OrganizationStorageSchema, OrganizationMembersSchema,
  CounterSchema, TestSchema, TaskSchema, TaskStatusSchema, TaskChecklistSchema, TagSchema, TaskPointSchema,
  TaskAutomationSchema, SchedulerSchema, FileStorageSchema, ProjectSchema, ProjectSettingNotificationSchema,
  ProjectViewSchema, VisionSchema, MembersSchema, StatsSchema, DashboardComponentSchema, DashboardSchema,
  ActivitySchema, CommentSchema
];

// Add virtual 'id' field to all schemas
allSchemas.forEach(schema => {
  schema.virtual('id').get(function(this: Document<Schema.Types.ObjectId>) {
    return this._id.toString();
  });
});

// Ensure virtuals are included in toJSON output
const toJSONConfig = {
  virtuals: true,
  transform: (doc: any, ret: any) => {
    ret.id = ret._id.toHexString();
    return ret;
  }
};

// Apply toJSON configuration to all schemas
allSchemas.forEach(schema => {
  schema.set('toJSON', toJSONConfig);
});

// Create models with existence check
function createModel<T extends Document>(name: string, schema: Schema): Model<T> {
  return mongoose.models[name] || mongoose.model<T>(name, schema, name);
}

// Create and export all models
export const userModel = createModel<IUser>('User', UserSchema);
export const favoritesModel = createModel<IFavorites>('Favorites', FavoritesSchema);
export const organizationModel = createModel<IOrganization>('Organization', OrganizationSchema);
export const organizationStorageModel = createModel<IOrganizationStorage>('OrganizationStorage', OrganizationStorageSchema);
export const organizationMembersModel = createModel<IOrganizationMember>('OrganizationMembers', OrganizationMembersSchema);
export const counterModel = createModel<ICounter>('Counter', CounterSchema);
export const testModel = createModel<ITest>('Test', TestSchema);
export const taskModel = createModel<ITask>('Task', TaskSchema);
export const taskStatusModel = createModel<ITaskStatus>('TaskStatus', TaskStatusSchema);
export const taskChecklistModel = createModel<ITaskChecklist>('TaskChecklist', TaskChecklistSchema);
export const tagModel = createModel<ITag>('Tag', TagSchema);
export const taskPointModel = createModel<ITaskPoint>('TaskPoint', TaskPointSchema);
export const taskAutomationModel = createModel<ITaskAutomation>('TaskAutomation', TaskAutomationSchema);
export const schedulerModel = createModel<IScheduler>('Scheduler', SchedulerSchema);
export const fileStorageModel = createModel<IFileStorage>('FileStorage', FileStorageSchema);
export const projectModel = createModel<IProject>('Project', ProjectSchema);
export const projectSettingNotificationModel = createModel<IProjectSettingNotification>('ProjectSettingNotification', ProjectSettingNotificationSchema);
export const projectViewModel = createModel<IProjectView>('ProjectView', ProjectViewSchema);
export const visionModel = createModel<IVision>('Vision', VisionSchema);
export const membersModel = createModel<IMember>('Members', MembersSchema);
export const statsModel = createModel<IStats>('Stats', StatsSchema);
export const dashboardComponentModel = createModel<IDashboardComponent>('DashboardComponent', DashboardComponentSchema);
export const dashboardModel = createModel<IDashboard>('Dashboard', DashboardSchema);
export const activityModel = createModel<IActivity>('Activity', ActivitySchema);
export const commentModel = createModel<IComment>('Comment', CommentSchema);
