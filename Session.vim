let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd /mnt/Data/code/fullstack/kampuni-area/comments
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +4 packages/ui-app/app/_features/TaskComments/index.tsx
badd +15 packages/ui-app/app/_features/TaskComments/TaskCommentListItem.tsx
badd +23 packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx
badd +69 packages/ui-app/app/_features/TaskComments/TaskComment.tsx
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/shared-ui/src/components/Controls/RichTextEditorControl/index.tsx
badd +1 packages/shared-ui/src/components/Controls/TextareaControl/index.tsx
badd +20 packages/ui-app/app/_features/TaskComments/TaskCommentContainer.tsx
badd +69 packages/ui-app/app/_features/TaskComments/context.tsx
badd +14 /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/TaskCommentList.tsx
badd +51 packages/shared-ui/src/components/Modal/index.tsx
badd +14 packages/shared-ui/src/components/Controls/RichTextEditorControl/suggestionBase.ts
badd +89 packages/shared-ui/src/components/Controls/RichTextEditorControl/MentionList.tsx
badd +10 packages/shared-ui/src/components/Controls/RichTextEditorControl/styles.css
badd +22 packages/shared-ui/src/components/Controls/RichTextEditorControl/MentionList.css
badd +28 packages/shared-ui/src/components/Loading/LoadingContainer.tsx
badd +20 packages/shared-ui/src/components/Loading/Icon.tsx
badd +7 packages/ui-app/app/_features/ProjectView/index.tsx
badd +10 packages/ui-app/app/_features/ProjectView/ProjectViewIcon.tsx
badd +14 packages/shared-ui/src/components/Tab/index.tsx
badd +201 packages/ui-app/app/_features/TaskDetail/index.tsx
badd +14 /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_components/FileKits/FileControl.tsx
badd +15 packages/shared-ui/src/components/Controls/PopoverControl/index.tsx
badd +9 packages/shared-ui/src/components/Popover/index.tsx
badd +5 packages/shared-ui/src/components/Controls/index.tsx
badd +31 packages/ui-app/app/_components/FileKits/index.tsx
badd +84 packages/shared-ui/src/components/DatePicker/index.tsx
argglobal
%argdel
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabrewind
edit packages/ui-app/app/_features/TaskComments/TaskComment.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 62 + 33) / 66)
exe 'vert 1resize ' . ((&columns * 119 + 120) / 240)
exe '2resize ' . ((&lines * 31 + 33) / 66)
exe 'vert 2resize ' . ((&columns * 120 + 120) / 240)
exe '3resize ' . ((&lines * 30 + 33) / 66)
exe 'vert 3resize ' . ((&columns * 120 + 120) / 240)
argglobal
balt packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 75 - ((47 * winheight(0) + 30) / 61)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 75
normal! 015|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/TaskComments/context.tsx", ":p")) | buffer packages/ui-app/app/_features/TaskComments/context.tsx | else | edit packages/ui-app/app/_features/TaskComments/context.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/TaskComments/context.tsx
endif
balt packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
89,107fold
89,107fold
let &fdl = &fdl
89
normal! zo
89
normal! zo
let s:l = 94 - ((19 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 94
normal! 024|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/TaskComments/TaskCommentContainer.tsx", ":p")) | buffer packages/ui-app/app/_features/TaskComments/TaskCommentContainer.tsx | else | edit packages/ui-app/app/_features/TaskComments/TaskCommentContainer.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/TaskComments/TaskCommentContainer.tsx
endif
balt packages/ui-app/app/_features/TaskComments/context.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 22 - ((17 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 22
normal! 05|
wincmd w
exe '1resize ' . ((&lines * 62 + 33) / 66)
exe 'vert 1resize ' . ((&columns * 119 + 120) / 240)
exe '2resize ' . ((&lines * 31 + 33) / 66)
exe 'vert 2resize ' . ((&columns * 120 + 120) / 240)
exe '3resize ' . ((&lines * 30 + 33) / 66)
exe 'vert 3resize ' . ((&columns * 120 + 120) / 240)
tabnext
edit /mnt/Data/code/fullstack/kampuni-area/comments/packages/shared-ui/src/components/Controls/RichTextEditorControl/index.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 119 + 120) / 240)
exe '2resize ' . ((&lines * 31 + 33) / 66)
exe 'vert 2resize ' . ((&columns * 120 + 120) / 240)
exe '3resize ' . ((&lines * 31 + 33) / 66)
exe 'vert 3resize ' . ((&columns * 120 + 120) / 240)
argglobal
balt packages/ui-app/app/_features/TaskComments/TaskComment.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 148 - ((45 * winheight(0) + 31) / 62)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 148
normal! 010|
wincmd w
argglobal
if bufexists(fnamemodify("packages/shared-ui/src/components/Controls/RichTextEditorControl/suggestionBase.ts", ":p")) | buffer packages/shared-ui/src/components/Controls/RichTextEditorControl/suggestionBase.ts | else | edit packages/shared-ui/src/components/Controls/RichTextEditorControl/suggestionBase.ts | endif
if &buftype ==# 'terminal'
  silent file packages/shared-ui/src/components/Controls/RichTextEditorControl/suggestionBase.ts
endif
balt packages/shared-ui/src/components/Controls/RichTextEditorControl/MentionList.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 3 - ((2 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 3
normal! 04|
wincmd w
argglobal
if bufexists(fnamemodify("packages/shared-ui/src/components/Controls/RichTextEditorControl/MentionList.tsx", ":p")) | buffer packages/shared-ui/src/components/Controls/RichTextEditorControl/MentionList.tsx | else | edit packages/shared-ui/src/components/Controls/RichTextEditorControl/MentionList.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/shared-ui/src/components/Controls/RichTextEditorControl/MentionList.tsx
endif
balt packages/shared-ui/src/components/Controls/RichTextEditorControl/suggestionBase.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 89 - ((12 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 89
normal! 023|
wincmd w
3wincmd w
exe 'vert 1resize ' . ((&columns * 119 + 120) / 240)
exe '2resize ' . ((&lines * 31 + 33) / 66)
exe 'vert 2resize ' . ((&columns * 120 + 120) / 240)
exe '3resize ' . ((&lines * 31 + 33) / 66)
exe 'vert 3resize ' . ((&columns * 120 + 120) / 240)
tabnext
edit packages/shared-ui/src/components/Controls/RichTextEditorControl/suggestionBase.ts
argglobal
balt /mnt/Data/code/fullstack/kampuni-area/comments/packages/shared-ui/src/components/Controls/RichTextEditorControl/index.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 44 - ((43 * winheight(0) + 31) / 62)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 44
normal! 010|
tabnext 2
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
