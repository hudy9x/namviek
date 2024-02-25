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
badd +21 packages/ui-app/app/_features/TaskComments/TaskCommentListItem.tsx
badd +23 packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx
badd +45 packages/ui-app/app/_features/TaskComments/TaskComment.tsx
badd +1 /mnt/Data/code/fullstack/kampuni-area/comments/packages/shared-ui/src/components/Controls/RichTextEditorControl/index.tsx
badd +1 packages/shared-ui/src/components/Controls/TextareaControl/index.tsx
badd +45 packages/ui-app/app/_features/TaskComments/TaskCommentContainer.tsx
badd +61 packages/ui-app/app/_features/TaskComments/context.tsx
badd +14 /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/TaskCommentList.tsx
argglobal
%argdel
tabnew +setlocal\ bufhidden=wipe
tabrewind
edit packages/ui-app/app/_features/TaskComments/TaskComment.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd w
wincmd w
wincmd w
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
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
exe '1resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 59 + 120) / 240)
exe '2resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 60 + 120) / 240)
exe '3resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 3resize ' . ((&columns * 63 + 120) / 240)
exe '4resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 4resize ' . ((&columns * 90 + 120) / 240)
exe '5resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 5resize ' . ((&columns * 93 + 120) / 240)
exe '6resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 6resize ' . ((&columns * 55 + 120) / 240)
exe '7resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 7resize ' . ((&columns * 55 + 120) / 240)
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
let s:l = 44 - ((17 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 44
normal! 021|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/TaskComments/TaskCommentContainer.tsx", ":p")) | buffer packages/ui-app/app/_features/TaskComments/TaskCommentContainer.tsx | else | edit packages/ui-app/app/_features/TaskComments/TaskCommentContainer.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/TaskComments/TaskCommentContainer.tsx
endif
balt packages/ui-app/app/_features/TaskComments/index.tsx
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
let s:l = 36 - ((8 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 36
normal! 04|
wincmd w
argglobal
if bufexists(fnamemodify("/mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/TaskCommentList.tsx", ":p")) | buffer /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/TaskCommentList.tsx | else | edit /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/TaskCommentList.tsx | endif
if &buftype ==# 'terminal'
  silent file /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/TaskCommentList.tsx
endif
balt packages/ui-app/app/_features/TaskComments/TaskCommentContainer.tsx
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
let s:l = 10 - ((9 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 10
normal! 011|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/TaskComments/context.tsx", ":p")) | buffer packages/ui-app/app/_features/TaskComments/context.tsx | else | edit packages/ui-app/app/_features/TaskComments/context.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/TaskComments/context.tsx
endif
balt packages/ui-app/app/_features/TaskComments/TaskCommentContainer.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
56,74fold
56,74fold
let &fdl = &fdl
56
normal! zo
56
normal! zo
let s:l = 74 - ((11 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 74
normal! 06|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/TaskComments/TaskCommentContainer.tsx", ":p")) | buffer packages/ui-app/app/_features/TaskComments/TaskCommentContainer.tsx | else | edit packages/ui-app/app/_features/TaskComments/TaskCommentContainer.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/TaskComments/TaskCommentContainer.tsx
endif
balt /mnt/Data/code/fullstack/kampuni-area/comments/packages/ui-app/app/_features/TaskComments/TaskCommentList.tsx
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
let s:l = 43 - ((21 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 43
normal! 08|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx", ":p")) | buffer packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx | else | edit packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/TaskComments/TaskCommentInput.tsx
endif
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
let s:l = 13 - ((11 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 13
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/TaskComments/TaskCommentListItem.tsx", ":p")) | buffer packages/ui-app/app/_features/TaskComments/TaskCommentListItem.tsx | else | edit packages/ui-app/app/_features/TaskComments/TaskCommentListItem.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/TaskComments/TaskCommentListItem.tsx
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
let &fdl = &fdl
let s:l = 21 - ((13 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 21
normal! 022|
wincmd w
6wincmd w
exe '1resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 1resize ' . ((&columns * 59 + 120) / 240)
exe '2resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 2resize ' . ((&columns * 60 + 120) / 240)
exe '3resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 3resize ' . ((&columns * 63 + 120) / 240)
exe '4resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 4resize ' . ((&columns * 90 + 120) / 240)
exe '5resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 5resize ' . ((&columns * 93 + 120) / 240)
exe '6resize ' . ((&lines * 31 + 32) / 65)
exe 'vert 6resize ' . ((&columns * 55 + 120) / 240)
exe '7resize ' . ((&lines * 30 + 32) / 65)
exe 'vert 7resize ' . ((&columns * 55 + 120) / 240)
tabnext
edit /mnt/Data/code/fullstack/kampuni-area/comments/packages/shared-ui/src/components/Controls/RichTextEditorControl/index.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
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
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe 'vert 2resize ' . ((&columns * 119 + 120) / 240)
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
let s:l = 36 - ((32 * winheight(0) + 31) / 62)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 36
normal! 043|
wincmd w
argglobal
if bufexists(fnamemodify("packages/shared-ui/src/components/Controls/TextareaControl/index.tsx", ":p")) | buffer packages/shared-ui/src/components/Controls/TextareaControl/index.tsx | else | edit packages/shared-ui/src/components/Controls/TextareaControl/index.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/shared-ui/src/components/Controls/TextareaControl/index.tsx
endif
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
let s:l = 15 - ((14 * winheight(0) + 31) / 62)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 15
normal! 017|
wincmd w
exe 'vert 1resize ' . ((&columns * 120 + 120) / 240)
exe 'vert 2resize ' . ((&columns * 119 + 120) / 240)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
