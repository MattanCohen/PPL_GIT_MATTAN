
(define make-ok
  (lambda (val)
    (cons "ok" val)
  )
 )
 
(define make-error
  (lambda (msg)
    (cons "error" val)
  )
 )

(define ok?
  (lambda (res)
    (if (= (car res) "ok") (make-ok #t) (make-ok #f))
  )
 )

(define error?
  (lambda (res)
    (if (= (car res) "error") 
      (make-ok #t) (make-ok #f))
  )
 )

(define result?
  (lambda (res)
    (if (ok? res) 
      #t 
      (if (error? error) 
        #t
        (make-error "Not result")))
  )
 )

(define result->val
  (lambda (res)
    (cdr res)
  )
)










(define bind 
  (lambda (f)
    @TODO
  )
)

(define make-dict
  (lambda ()
    @TODO
  )
)

(define dict?
  (lambda (e)
    @TODO
  )
)

(define get
  (lambda (dict k)
    @TODO
  )
)

(define put
  (lambda (dict k v)
    @TODO
  )
)

(define map-dict
  (lambda (dict f)
    @TODO
  )
)

(define filter-dict
  (lambda (dict pred)
    @TODO
  )
)
