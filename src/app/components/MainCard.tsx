import { forwardRef, CSSProperties, ReactNode, Ref } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, CardProps, CardHeaderProps, CardContentProps } from '@mui/material';
import { KeyedObject } from '../types/types';

/**
 * CSS styles for the card header.
 */
const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

/**
 * MainCard component props.
 */
export interface MainCardProps extends KeyedObject {
  border?: boolean;
  boxShadow?: boolean;
  children: ReactNode | string;
  subheader?: ReactNode | string;
  style?: CSSProperties;
  content?: boolean;
  contentSX?: CardContentProps['sx'];
  darkTitle?: boolean;
  divider?: boolean;
  sx?: CardProps['sx'];
  secondary?: CardHeaderProps['action'];
  shadow?: string;
  elevation?: number;
  title?: ReactNode | string;
  codeHighlight?: boolean;
  codeString?: string;
  modal?: boolean;
}

/**
 * MainCard is a customizable Material-UI Card component with extended features.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.border=true] - Whether to display a border around the card.
 * @param {boolean} [props.boxShadow] - Whether to display a box shadow around the card.
 * @param {ReactNode | string} props.children - The content to be displayed within the card.
 * @param {ReactNode | string} [props.subheader] - The subheader content for the card.
 * @param {CSSProperties} [props.style] - Additional CSS styles for the card.
 * @param {boolean} [props.content=true] - Whether to display the card content section.
 * @param {CardContentProps['sx']} [props.contentSX={}] - Additional CSS styles for the card content section.
 * @param {boolean} [props.darkTitle] - Whether to use dark text color for the card title.
 * @param {boolean} [props.divider=true] - Whether to display a divider below the card title.
 * @param {number} [props.elevation] - The elevation level for the card.
 * @param {CardHeaderProps['action']} [props.secondary] - Additional action element to be displayed on the card header.
 * @param {string} [props.shadow] - The CSS shadow property for the card.
 * @param {CSSProperties} [props.sx={}] - Additional CSS styles for the card.
 * @param {ReactNode | string} [props.title] - The title content for the card.
 * @param {boolean} [props.codeHighlight=false] - Whether to apply code highlighting styles.
 * @param {string} [props.codeString] - The code string to be highlighted.
 * @param {boolean} [props.modal=false] - Whether to display the card as a modal.
 * @param {...CardProps} [props.others] - Additional Material-UI Card props.
 *
 * @returns {ReactNode} The MainCard component.
 *
 * @example
 * // Basic usage:
 * <MainCard title="My Card Title">
 *   <CardContent>
 *     Card Content
 *   </CardContent>
 * </MainCard>
 *
 * // With custom subheader and no border:
 * <MainCard title="Custom Card" subheader="Subheader" border={false}>
 *   <CardContent>
 *     Card Content
 *   </CardContent>
 * </MainCard>
 *
 * // Using code highlighting:
 * <MainCard title="Code Example" codeHighlight codeString="const greeting = 'Hello, World!';">
 *   <CardContent>
 *     Code content
 *   </CardContent>
 * </MainCard>
 */
const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      subheader,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      codeHighlight = false,
      codeString,
      modal = false,
      ...others
    }: MainCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();
    boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

    return (
      <Card
        elevation={elevation || 0}
        ref={ref}
        {...others}
        sx={{
          position: 'relative',
          border: border ? '1px solid' : 'none',
          borderRadius: 1,
          borderColor: theme.palette.divider,
          boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow : 'inherit',
          ':hover': {
            boxShadow: boxShadow ? shadow : 'inherit',
          },
          ...(codeHighlight && {
            '& pre': {
              m: 0,
              p: '12px !important',
              fontFamily: theme.typography.fontFamily,
              fontSize: '0.75rem',
            },
          }),
          ...(modal && {
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: `calc(100% - 50px)`, sm: 'auto' },
            '& .MuiCardContent-root': {
              overflowY: 'auto',
              minHeight: 'auto',
              maxHeight: `calc(100vh - 200px)`,
            },
          }),
          ...sx,
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={headerSX}
            titleTypographyProps={{ variant: 'subtitle1' }}
            title={title}
            action={secondary}
            subheader={subheader}
          />
        )}
        {/* content & header divider */}
        {title && divider && <Divider />}
        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;

