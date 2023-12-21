type Awaitable<T> = T | PromiseLike<T>;

interface ImportInfo {
    as?: string;
    name?: string;
    from: string;
}

type SideEffectsInfo = (ImportInfo | string)[] | ImportInfo | string | undefined;

interface ComponentInfo extends ImportInfo {
    sideEffects?: SideEffectsInfo;
}

type ComponentResolveResult = Awaitable<string | ComponentInfo | null | undefined | void>;

type ComponentResolverFunction = (name: string) => ComponentResolveResult;
interface ComponentResolverObject {
    type: 'component' | 'directive';
    resolve: ComponentResolverFunction;
}
type ComponentResolver = ComponentResolverFunction | ComponentResolverObject;

interface IMatcher {
    pattern: RegExp;
    styleDir: string;
}
function kebabCase(key: string) {
    const result = key.replace(/([A-Z])/g, ' $1').trim();
    return result.split(' ').join('-').toLowerCase();
}

const matchComponents: IMatcher[] = [
    {
        pattern: /^Avatar/,
        styleDir: 'avatar',
    },
    {
        pattern: /^AutoComplete/,
        styleDir: 'auto-complete',
    },
    {
        pattern: /^Anchor/,
        styleDir: 'anchor',
    },

    {
        pattern: /^Badge/,
        styleDir: 'badge',
    },
    {
        pattern: /^Breadcrumb/,
        styleDir: 'breadcrumb',
    },
    {
        pattern: /^Button/,
        styleDir: 'button',
    },
    {
        pattern: /^Checkbox/,
        styleDir: 'checkbox',
    },
    {
        pattern: /^Card/,
        styleDir: 'card',
    },
    {
        pattern: /^Collapse/,
        styleDir: 'collapse',
    },
    {
        pattern: /^Descriptions/,
        styleDir: 'descriptions',
    },
    {
        pattern: /^RangePicker|^WeekPicker|^MonthPicker/,
        styleDir: 'date-picker',
    },
    {
        pattern: /^Dropdown/,
        styleDir: 'dropdown',
    },

    {
        pattern: /^Form/,
        styleDir: 'form',
    },
    {
        pattern: /^InputNumber/,
        styleDir: 'input-number',
    },

    {
        pattern: /^Input|^Textarea/,
        styleDir: 'input',
    },
    {
        pattern: /^Statistic/,
        styleDir: 'statistic',
    },
    {
        pattern: /^CheckableTag/,
        styleDir: 'tag',
    },
    {
        pattern: /^TimeRangePicker/,
        styleDir: 'time-picker',
    },
    {
        pattern: /^Layout/,
        styleDir: 'layout',
    },
    {
        pattern: /^Menu|^SubMenu/,
        styleDir: 'menu',
    },

    {
        pattern: /^Table/,
        styleDir: 'table',
    },
    {
        pattern: /^TimePicker|^TimeRangePicker/,
        styleDir: 'time-picker',
    },
    {
        pattern: /^Radio/,
        styleDir: 'radio',
    },

    {
        pattern: /^Image/,
        styleDir: 'image',
    },

    {
        pattern: /^List/,
        styleDir: 'list',
    },

    {
        pattern: /^Tab/,
        styleDir: 'tabs',
    },
    {
        pattern: /^Mentions/,
        styleDir: 'mentions',
    },

    {
        pattern: /^Step/,
        styleDir: 'steps',
    },
    {
        pattern: /^Skeleton/,
        styleDir: 'skeleton',
    },

    {
        pattern: /^Select/,
        styleDir: 'select',
    },
    {
        pattern: /^TreeSelect/,
        styleDir: 'tree-select',
    },
    {
        pattern: /^Tree|^DirectoryTree/,
        styleDir: 'tree',
    },
    {
        pattern: /^Typography/,
        styleDir: 'typography',
    },
    {
        pattern: /^Timeline/,
        styleDir: 'timeline',
    },
    {
        pattern: /^Upload/,
        styleDir: 'upload',
    },
    {
        pattern: /^message/,
        styleDir: 'message',
    },
];

interface AntDesignResolverOptions {
    /**
     * exclude components that do not require automatic import
     *
     * @default []
     */
    exclude?: string[];
    /**
     * import style along with components
     *
     * @default 'css'
     */
    importStyle?: boolean | 'css' | 'less';
    /**
     * resolve `antd' icons
     *
     * requires package `@antd/icons-vue`
     *
     * @default false
     */
    resolveIcons?: boolean;

    /**
     * @deprecated use `importStyle: 'css'` instead
     */
    importCss?: boolean;
    /**
     * @deprecated use `importStyle: 'less'` instead
     */
    importLess?: boolean;

    /**
     * use commonjs build default false
     */
    cjs?: boolean;
}

function getStyleDir(compName: string): string {
    let styleDir;
    const total = matchComponents.length;
    for (let i = 0; i < total; i += 1) {
        const matcher = matchComponents[i];
        if (compName.match(matcher.pattern)) {
            styleDir = matcher.styleDir;
            break;
        }
    }
    if (!styleDir) styleDir = kebabCase(compName);

    return styleDir;
}

function getSideEffects(compName: string, options: AntDesignResolverOptions): SideEffectsInfo {
    const { importStyle = true } = options;

    if (!importStyle) return '';
    const lib = options.cjs ? 'lib' : 'es';

    if (importStyle === 'less') {
        const styleDir = getStyleDir(compName);
        return `antd/${lib}/${styleDir}/style`;
    }

    const styleDir = getStyleDir(compName);
    return `antd/${lib}/${styleDir}/style/css`;
}
const primitiveNames = [
    'Affix',
    'Anchor',
    'AnchorLink',
    'AutoComplete',
    'AutoCompleteOptGroup',
    'AutoCompleteOption',
    'Alert',
    'Avatar',
    'AvatarGroup',
    'BackTop',
    'Badge',
    'BadgeRibbon',
    'Breadcrumb',
    'BreadcrumbItem',
    'BreadcrumbSeparator',
    'Button',
    'ButtonGroup',
    'Calendar',
    'Card',
    'CardGrid',
    'CardMeta',
    'Collapse',
    'CollapsePanel',
    'Carousel',
    'Cascader',
    'Checkbox',
    'CheckboxGroup',
    'Col',
    'Comment',
    'ConfigProvider',
    'DatePicker',
    'MonthPicker',
    'WeekPicker',
    'RangePicker',
    'QuarterPicker',
    'Descriptions',
    'DescriptionsItem',
    'Divider',
    'Dropdown',
    'DropdownButton',
    'Drawer',
    'Empty',
    'Form',
    'FormItem',
    'FormItemRest',
    'Grid',
    'Input',
    'InputGroup',
    'InputPassword',
    'InputSearch',
    'Textarea',
    'Image',
    'ImagePreviewGroup',
    'InputNumber',
    'Layout',
    'LayoutHeader',
    'LayoutSider',
    'LayoutFooter',
    'LayoutContent',
    'List',
    'ListItem',
    'ListItemMeta',
    'Menu',
    'MenuDivider',
    'MenuItem',
    'MenuItemGroup',
    'SubMenu',
    'Mentions',
    'MentionsOption',
    'Modal',
    'Statistic',
    'StatisticCountdown',
    'PageHeader',
    'Pagination',
    'Popconfirm',
    'Popover',
    'Progress',
    'Radio',
    'RadioButton',
    'RadioGroup',
    'Rate',
    'Result',
    'Row',
    'Select',
    'SelectOptGroup',
    'SelectOption',
    'Skeleton',
    'SkeletonButton',
    'SkeletonAvatar',
    'SkeletonInput',
    'SkeletonImage',
    'Slider',
    'Space',
    'Spin',
    'Steps',
    'Step',
    'Switch',
    'Table',
    'TableColumn',
    'TableColumnGroup',
    'TableSummary',
    'TableSummaryRow',
    'TableSummaryCell',
    'Transfer',
    'Tree',
    'TreeNode',
    'DirectoryTree',
    'TreeSelect',
    'TreeSelectNode',
    'Tabs',
    'TabPane',
    'Tag',
    'CheckableTag',
    'TimePicker',
    'TimeRangePicker',
    'Timeline',
    'TimelineItem',
    'Tooltip',
    'Typography',
    'TypographyLink',
    'TypographyParagraph',
    'TypographyText',
    'TypographyTitle',
    'Upload',
    'UploadDragger',
    'LocaleProvider',
    'message',
];

let antdNames: Set<string>;

function genAntdNames(names: string[]): void {
    antdNames = new Set(names);
}
genAntdNames(primitiveNames);

function isAntd(compName: string): boolean {
    return antdNames.has(compName);
}

/**
 * Resolver for Ant Design
 *
 * Requires antd@v4.20.0-alpha.1 or later
 *
 * @author yinbinyu
 */
export function AntDesignResolver(options: AntDesignResolverOptions = {}): ComponentResolver {
    return (name: string) => {
        if (options.resolveIcons && name.match(/(Outlined|Filled|TwoTone)$/)) {
            return {
                name,
                from: '@ant-design/icons',
            };
        }

        if (isAntd(name) && !options?.exclude?.includes(name)) {
            const from = `antd`;
            return {
                name,
                from,
                sideEffects: getSideEffects(name, options),
            };
        }
        return null;
    };
}
