import { Color } from '@/data';
import { Icon } from '@/components/Icon';
import ClIconButton from '../ClIconButton.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { IconButtonSize, IconButtonType } from '..';

const meta = {
	title: 'Button/cl-icon-button',
	component: ClIconButton,
	tags: ['autodocs'],
	argTypes: {
		icon: {
			description: 'The name of the icon from the Icon enum',
			control: {
				type: 'select',
			},
			table: {
				category: 'props',
				subcategory: 'required',
				type: {
					summary: 'Icon',
					detail: `enum Icon {\n${
						Object.keys(Icon)
							.map((m: string) => `\t${m} = "${Icon[m as keyof typeof Icon]}",`)
							.join('\r\n') + '\r\n}'
					}`,
				},
				defaultValue: {
					summary: undefined,
				},
			},
			options: Object.keys(Icon).map((m: string) => Icon[m as keyof typeof Icon]),
		},
		disabled: {
			description: 'Whether the button is disabled or not',
			table: {
				category: 'props',
				subcategory: 'optional',
				type: {
					summary: 'boolean',
				},
				defaultValue: {
					summary: false,
				},
			},
			control: {
				type: 'boolean',
			},
		},
		buttonSize: {
			description: 'The name of the icon from the Icon enum',
			control: {
				type: 'select',
			},
			table: {
				category: 'props',
				subcategory: 'optional',
				type: {
					summary: 'IconButtonSize',
					detail: `enum IconButtonSize {\n${
						Object.keys(IconButtonSize)
							.map((m: string) => `\t${m} = "${IconButtonSize[m as keyof typeof IconButtonSize]}",`)
							.join('\r\n') + '\r\n}'
					}`,
				},
			},
			options: Object.keys(IconButtonSize).map(
				(m: string) => IconButtonSize[m as keyof typeof IconButtonSize],
			),
		},
		iconColor: {
			description: 'Color of the Icon',
			table: {
				category: 'props',
				subcategory: 'optional',
				type: {
					summary: 'Color | string',
					detail: `enum Color {\n${
						Object.keys(Color)
							.map((m: string) => `\t${m} = "${Color[m as keyof typeof Color]}",`)
							.join('\r\n') + '\r\n}'
					}`,
				},
				defaultValue: {
					summary: 'black',
				},
			},
			control: {
				type: 'color',
			},
		},
		backgroundColor: {
			description: 'Background color of the button',
			table: {
				category: 'props',
				subcategory: 'optional',
				type: {
					summary: 'Color | string',
					detail: `enum Color {\n${
						Object.keys(Color)
							.map((m: string) => `\t${m} = "${Color[m as keyof typeof Color]}",`)
							.join('\r\n') + '\r\n}'
					}`,
				},
				defaultValue: {
					summary: Color['gray-100'],
				},
			},
			control: {
				type: 'color',
			},
		},
		type: {
			description: 'The type of the button',
			table: {
				category: 'props',
				subcategory: 'optional',
				type: {
					summary: 'ButtonType',
					detail: `enum ButtonType {\n${
						Object.keys(IconButtonType)
							.map((m: string) => `\t${m} = "${IconButtonType[m as keyof typeof IconButtonType]}",`)
							.join('\r\n') + '\r\n}'
					}`,
				},
				defaultValue: {
					summary: IconButtonType.rounded,
				},
			},
			control: {
				type: 'select',
			},
			options: Object.keys(IconButtonType).map(
				(m: string) => IconButtonType[m as keyof typeof IconButtonType],
			),
		},
		onClick: {
			description: 'The function to call when the button is clicked',
			table: {
				category: 'props',
				subcategory: 'optional',
				action: 'clicked',
				type: {
					summary: '() => void',
				},
				defaultValue: {
					summary: undefined,
				},
			},
			action: 'clicked',
			control: {
				type: null,
			},
		},
	},
} as Meta<typeof ClIconButton>;

export default meta;

type Story = StoryObj<typeof ClIconButton>;

export const Default: Story = {
	parameters: {
		backgrounds: { default: 'white' },
	},
	args: {
		icon: Icon.activity,
		iconColor: Color.black,
		buttonSize: IconButtonSize.base,
		backgroundColor: Color['gray-100'],
	},
};
