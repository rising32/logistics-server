import type { RecoilState } from 'recoil';
import { atom } from 'recoil';
import { UserState } from './user';

export interface CompanyState {
  company_id: string;
  manager_info: UserState;
  organization: {
    name: string;
  };
  work_setting: {
    daily_work_routine: string;
    first_day: string;
    priorites: boolean;
    deliverables: boolean;
  };
  date_time_currency: {
    date_format: string;
    time_format: boolean;
    currency: string;
    decimal_separator: string;
  };
  team: {
    team_id: string;
    team_member: UserState[];
  };
}

export interface CientState {
  client_id: string;
  client_name: string;
  isActive: boolean;
  billable_days?: any;
}
export interface ProjectState {
  project_id: string;
  project_name: string;
  isActive: boolean;
  role: string;
}
export interface TaskState {
  task_id: string;
  task_name: string;
  hourly_rate: number;
  isActive: boolean;
}

export interface MemberState {
  company_id: string;
  member_info: UserState;
  organization: {
    name: string;
  };
  work_setting: {
    daily_work_routine: string;
    first_day: string;
    priorites: boolean;
    deliverables: boolean;
  };
  date_time_currency: {
    date_format: string;
    time_format: boolean;
    currency: string;
    decimal_separator: string;
  };
  clients: CientState[];
  projects: ProjectState[];
  tasks: TaskState[];
  team: {
    team_id: string;
    team_member: UserState[];
  };
}

export const companyData: CompanyState = {
  company_id: 'company_id',
  manager_info: {
    user_id: 'test_id',
    email: 'jf.loubeyre@gmail.com',
    display_name: 'Loubeyre',
    avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
  },
  organization: {
    name: 'ID Logistics',
  },
  work_setting: {
    daily_work_routine: '09:00',
    first_day: 'week',
    priorites: true,
    deliverables: true,
  },
  date_time_currency: {
    date_format: 'YYYY-MM-DD',
    time_format: true,
    currency: 'Euro',
    decimal_separator: 'Comma',
  },
  team: {
    team_id: 'team_id',
    team_member: [
      {
        user_id: 'test_id_1',
        email: 'jf.loubeyre@gmail.com',
        display_name: 'Loubeyre',
        avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
      },
      {
        user_id: 'test_id_2',
        email: 'jf.loubeyre@gmail.com',
        display_name: 'Loubeyre',
        avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
      },
    ],
  },
};

export const memberData: MemberState = {
  company_id: 'company_id',
  member_info: {
    user_id: 'test_id',
    email: 'dschrabonnat@id.logistics.com',
    display_name: 'Daniel',
    avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
  },
  organization: {
    name: 'ID Logistics',
  },
  work_setting: {
    daily_work_routine: '09:00',
    first_day: 'week',
    priorites: true,
    deliverables: true,
  },
  date_time_currency: {
    date_format: 'YYYY-MM-DD',
    time_format: true,
    currency: 'Euro (€)',
    decimal_separator: 'Comma',
  },
  clients: [
    {
      client_id: 'client_id_1',
      client_name: 'AMAZON MHG9',
      isActive: true,
    },
    {
      client_id: 'client_id_2',
      client_name: 'AMAZON XDEY',
      isActive: true,
    },
    {
      client_id: 'client_id_3',
      client_name: 'ATU M25',
      isActive: true,
    },
  ],
  projects: [
    {
      project_id: 'project_id_1',
      project_name: 'Analysis',
      isActive: true,
      role: 'manager',
    },
    {
      project_id: 'project_id_2',
      project_name: 'Consolidation',
      isActive: true,
      role: 'member',
    },
    {
      project_id: 'project_id_3',
      project_name: 'Inventory',
      isActive: true,
      role: 'manager',
    },
    {
      project_id: 'project_id_4',
      project_name: 'Joint venture',
      isActive: true,
      role: 'member',
    },
    {
      project_id: 'project_id_5',
      project_name: 'Management',
      isActive: true,
      role: 'manager',
    },
    {
      project_id: 'project_id_6',
      project_name: 'Perform plan',
      isActive: true,
      role: 'member',
    },
    {
      project_id: 'project_id_7',
      project_name: 'Ramp up program',
      isActive: true,
      role: 'manager',
    },
  ],
  tasks: [
    {
      task_id: 'task_id_1',
      task_name: 'Definie DPIR',
      hourly_rate: 620,
      isActive: true,
    },
    {
      task_id: 'task_id_2',
      task_name: 'Implement DPIR',
      hourly_rate: 630,
      isActive: true,
    },
    {
      task_id: 'task_id_3',
      task_name: 'Prepare DPIR',
      hourly_rate: 640,
      isActive: true,
    },
    {
      task_id: 'task_id_4',
      task_name: 'Resize',
      hourly_rate: 650,
      isActive: true,
    },
  ],
  team: {
    team_id: 'team_id',
    team_member: [
      {
        user_id: 'test_id_1',
        email: 'jf.loubeyre@gmail.com',
        display_name: 'Loubeyre',
        avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
      },
      {
        user_id: 'test_id_2',
        email: 'jf.loubeyre2@gmail.com',
        display_name: 'Loubeyre2',
        avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
      },
    ],
  },
};
